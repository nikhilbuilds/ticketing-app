import express, { Request, Response } from "express";
import { body } from "express-validator";
import querystring from "query-string";
import axios from "axios";
import { Payment } from "../models/Payment";
import {
  validateRequest,
  requireAuth,
  NotFoundError,
  NotAuthorizedError,
  OrderStatus,
  BadRequestError,
} from "@nk-ticketing-app/common";
import { Order } from "../models/Order";
import { natsWrapper } from "../nats-wrapper";
import { PaymentCreatedPublisher } from "../events/publishers/payment-created-publisher";
import { SupportCreatedPublisher } from "../events/publishers/support-created-publisher";
const router = express.Router();

router.post(
  "/api/payments",
  requireAuth,
  body("orderId").not().isEmpty(),
  validateRequest,
  async (req: Request, res: Response) => {
    const { orderId } = req.body;
    const order = await Order.findById(orderId);

    console.log("user ========================", req.user);

    if (!order) throw new NotFoundError();

    if (order.userId !== req.user!.id) throw new NotAuthorizedError();

    if (order.status === OrderStatus.Cancelled)
      throw new BadRequestError("Cannot pay for cancelled order");

    console.log("order", order);

    const url = "https://sandbox.cashfree.com/pg/orders";
    const options = {
      method: "POST",
      headers: {
        Accept: "application/json",
        "x-client-id": process.env.CASHFREE_CLIENT_ID,
        "x-client-secret": process.env.CASHFREE_CLIENT_SECRET,
        "x-api-version": "2021-05-21",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        customer_details: {
          customer_id: req.user?.id,
          customer_email: req.user?.email,
          customer_phone: req.user?.phone,
        },
        order_meta: {
          return_url:
            "https://ticketing.dev/orders?order_id={order_id}&order_token={order_token}",
          notify_url: "https://ticketing.dev/api/payments/notify",
        },
        order_amount: order.price,
        order_currency: "INR",
      }),
    };

    try {
      const resp: any = await axios.post(url, options.body, {
        headers: options.headers,
      });

      const payment = Payment.build({
        orderId: order.id,
        paymentId: resp.data.order_id,
      });

      await payment.save();
      return res.send(resp.data.payment_link);
    } catch (err) {
      console.log(err);
      throw new BadRequestError("Somwthing Went Wrong");
    }
  }
);

router.post("/api/payments/notify", async (req, res) => {
  console.log("notify url called");
  const { order_id, order_token } = req.body.data;

  //find by paymentId
  const payment = await Payment.findOne({
    paymentId: order_id,
  }).populate("orders");

  console.log("payment ================>>===========>>", payment);

  if (!payment) throw new BadRequestError("Invalid Request");

  const resp = await axios.get(
    `https://sandbox.cashfree.com/pg/orders/${order_id}`,
    {
      headers: {
        Accept: "application/json",
        "x-client-id": process.env.CASHFREE_CLIENT_ID,
        "x-client-secret": process.env.CASHFREE_CLIENT_SECRET,
        "x-api-version": "2021-05-21",
      },
    }
  );

  const { order_status, customer_details, order_amount } = resp.data;

  let message: string = `Hi, Order amount: ${order_amount} has been paid successfully for order id: ${order_id}.`;

  if (order_status !== "PAID")
    message = `Sorry, your payment was not successful. Please try again. Order id: ${order_id}`;

  new SupportCreatedPublisher(natsWrapper.client).publish({
    customerEmail: customer_details.customer_email,
    type: "EMAIL",
    message: message,
  });

  if (order_status !== "PAID") throw new BadRequestError("Payment Cancelled");

  await new PaymentCreatedPublisher(natsWrapper.client).publish({
    id: payment.id,
    orderId: payment.orderId,
    paymentId: payment.paymentId,
  });

  return res.status(200).send("SUCCESS");
});

export { router as newRouter };
