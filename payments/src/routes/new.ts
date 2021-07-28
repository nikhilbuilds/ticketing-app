import express, { Request, Response } from "express";
import { body } from "express-validator";
import querystring from "query-string";
import axios from "axios";

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

const router = express.Router();

router.post(
  "/api/payments",
  requireAuth,
  body("orderId").not().isEmpty(),
  validateRequest,
  async (req: Request, res: Response) => {
    const { orderId } = req.body;
    const order = await Order.findById(orderId);

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
        "x-client-id": "67188ff09cd21cad81af6471288176",
        "x-client-secret": "07c84e237e66cffca8878bca1da952993d0d8e72",
        "x-api-version": "2021-05-21",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        customer_details: {
          customer_id: "7112AAA812234",
          customer_email: "john@cashfree.com",
          customer_phone: "9908734801",
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
      const resp = await axios.post(url, options.body, {
        headers: options.headers,
      });

      return res.send(resp.data.payment_link);
    } catch (err) {
      console.log(err);
      throw new BadRequestError("Somwthing Went Wrong");
    }
  }
);

router.get("/api/payments/notify", async (req, res) => {
  console.log("notify url called");
  console.log(req.body);
});

export { router as newRouter };
