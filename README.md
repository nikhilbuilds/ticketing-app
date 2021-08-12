# ticketing-app
A full stack application, where any customer can create, sell or purchase the tickets. Followed Event-Based Microservice Architecture and  Server-Side Rendering with React.

## Tech Stack
- API: ExpressJs
- UI: React and NextJs
- Database: MongoDB
- Deployed: Digital Ocean Kubernetes cluster.

## API Services
- Auth-service - Service used for authentication purposes i.e, user signup, signin and signout.
- Ticket-service - Service used for ticket creation and updating.
- Order-service - Service used for order creation and updating.
- Expiration-service -Service used for expiring/cancelling orders after 5 minutes.
- Payment-service - Service used for handling payments, completes the order only if payment is succeeded or cancels order if payment is failed.
- Support-service - Service used for handling Email and SMS notification.

- Expiration-service and Support-service does not have any routes, these services communicate through nats streaming listeners and publishers.

- Common contains common functionalities used shared with other services through npm package - [@nk-ticketing-app/common](https://www.npmjs.com/package/@nk-ticketing-app/common)
