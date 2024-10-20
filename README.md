# ticketing-app
A full stack application, where any customer can create, sell or purchase the tickets. Followed Event-Based Microservice Architecture and  Server-Side Rendering with React. [Full Documentation](https://docs.google.com/document/d/1K6H7cJf2meOdugvDHWsICZ9yJOS6ntolr2xVJNegxgg/edit?usp=sharing)

## Tech Stack
- API: ExpressJs
- UI: React and NextJs
- Database: MongoDB
- Search Engine: Elasticsearch
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

##TEST
## Future Features Roadmap

1. New Table for Database Constants

- Description: Create a new table for constants such as user types, where client and contractor types are kept in a separate table. This table will contain predefined types, and the Profile table will have a foreign key reference to this new constants table.

# Benefits:

- Data Consistency: By managing user types centrally, we ensure data consistency and avoid hard-coding values in multiple places.

- Easier Updates: Adding new profile types or modifying existing ones becomes simpler without requiring database migrations on the Profile table.

- Optimized Storage: Reduces redundancy by avoiding repeated string entries in multiple rows, replacing them with a single foreign key.

2. Partial Payment Feature

- Description: Allow clients to make partial payments for jobs. The client does not have to pay the full amount upfront; they can pay in installments until the job is fully paid.

- Benefits:

- Increased Flexibility: Clients may find it easier to pay for larger jobs in parts.

- Enhanced Cash Flow: Contractors can receive payment gradually rather than waiting for the full payment to be processed.

3. Expiration Date for Contracts

- Description: Add an expiration date or deadline field to the Contract table.

- Benefits:

- Project Management: Provides a clear timeline for both contractors and clients, helping to set expectations.

- Accountability: Deadlines help in tracking overdue contracts and keeping projects on schedule.

3. Expiration Date for Contracts

Description: Add an expiration date or deadline field to the Contract table.

Benefits:

Project Management: Provides a clear timeline for both contractors and clients, helping to set expectations.

Accountability: Deadlines help in tracking overdue contracts and keeping projects on schedule.

4. Auto-Detect Feature

Description: Introduce an auto-detect feature that can track and manage common tasks, such as identifying overdue contracts or suggesting potential jobs to contractors.

Benefits:

Automation: Reduces manual oversight required from clients and contractors.

Enhanced User Experience: Offers a proactive approach to managing contracts and jobs by suggesting actions automatically.

5. Printable Invoice with Cloud Storage

Description: Allow contractors and clients to generate printable invoices for completed jobs, which will be stored in an S3 bucket. These invoices can be accessed through a CDN (e.g., CloudFront) with an expirable presigned URL.

Benefits:

Secure Storage: Invoices are securely stored in S3 with limited access through presigned URLs.

Accessibility: Users can easily access and download invoices for bookkeeping purposes.

Cost-Effective: Using CloudFront provides faster access through caching, and the use of presigned URLs adds security by making links expire.

6. Ratings and Reviews for Profiles

Description: Add a ratings and reviews system where clients can rate contractors and vice versa after completing a job. A new Reviews table will store these ratings and written reviews.

Benefits:

Trust Building: Ratings help build trust and reliability in the platform, as users can make informed decisions based on feedback from other users.

Reputation Management: Contractors and clients can manage their profiles to improve their ratings by delivering quality work and cooperation.

7. Requirement Scope Documents

Description: Allow clients to upload scope documents related to their requirements. These documents will be stored in an S3 bucket and served through CloudFront with expirable presigned URLs.

Benefits:

Organized Requirements: Storing scope documents keeps project requirements organized and accessible to both clients and contractors.

Secure Access: Using presigned URLs ensures only authorized users can view or download documents, adding another layer of security.

Reference Material: Easy access to requirements for both parties helps in better understanding project goals and minimizing misunderstandings.




## App Images

<figure class="image">
  <img src="/app-images/ticket-1.png" height="50%" width="50%" >
</figure>
  
  <figure class="image">
  <img src="/app-images/ticket-2.png" height="50%" width="50%" >
</figure>

  <figure class="image">
  <img src="/app-images/ticket-3.png" height="50%" width="50%" >
</figure>


  <figure class="image">
  <img src="/app-images/ticket-4.png" height="50%" width="50%" >
</figure>
