# Stay Solution BD , is one point solution of rental service

### [Live Link](https://stay-solution-bd-emranswe.vercel.app/)
 -[ POSTMAN ](https://martian-comet-596528.postman.co/workspace/New-Team-Workspace~4291e7f1-879e-4461-9d74-21bf9d590423/collection/27394351-094df829-23b0-4ef2-a540-4f7464feb98b?action=share&creator=27394351)

# Stay Solution BD

A comprehensive rental management system that provides a seamless experience for property owners and renters.

## Core Features

- **User Registration and Profiles**
  - Separate registration processes for property owners and renters.
  - Profiles store and display relevant details like owner’s properties and tenant’s booking history.

- **Property Listing**
  - Owners can add, edit, and delete their property listings.
  - Listings contain details like images, pricing, amenities, rules, location (with map integration), available dates, and more.

- **Search and Filter**
  - Tenants can search for properties based on criteria like location, price range, amenities, and more.
  - Detailed property view with all information and owner contact details.

- **Booking System**
  - Tenants can book available properties for specific dates.
  - Integration with a calendar to show availability and a confirmation process.

- **Payment Integration**
  - Tenants can pay rent online using various methods like credit cards, bank transfers, and digital wallets.

- **Repair/Issue Reporting**
  - Tenants can report issues they encounter during their stay.
  - Integration with a ticketing system for owners to track and address these issues.

- **Messaging System**
  - Direct, secure messaging between owners and tenants with end-to-end encryption.

- **Ratings and Reviews**
  - Tenants can rate and review properties after their stay, and owners can respond to these reviews.

## Tech Stack

- **Front-end**: Next.js
- **Back-end**: Node.js
- **Database**: PostgreSQL


### Notification
- **NotificationID**: Primary Key
- **UserID**: Foreign Key referencing User
- **Content**: Notification content
- **Timestamp**: When the notification was issued
- **NotificationType**: Type of notification (e.g., alert, reminder)
- **NotificationPlatform**: Where the notification was sent (e.g., app, email)
