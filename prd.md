# MerchHub MVP — Product Requirements Document

## 1. Product Overview

**MerchHub** is a simple creator marketplace that allows creators to list products and sell them directly to customers through a basic online storefront.

For the first MVP, MerchHub will focus on one core outcome:

> Allow a creator to publish a product and receive an order for that product.

The goal is not to build the complete MerchHub vision. The goal is to build, finish, deploy, and validate the smallest useful version of the product.

---

## 2. MVP Objective

The MVP should prove the following core loop:

**Creator signs up → creates product → publishes product → customer discovers product → customer places order → creator sees order.**

If this loop works reliably, the MVP is successful.

Everything that does not directly contribute to this loop should be deferred.

---

## 3. Target Users

### Primary User — Creator

A person who creates or sells products to an audience.

Examples:

- Clothing creators
- Artists
- Designers
- Small content creators
- Student entrepreneurs
- Small product-based businesses

The creator needs a simple way to put their products online without building their own store.

### Secondary User — Customer

Someone who wants to discover and purchase products from creators.

The customer should not need a complicated marketplace experience to place an order.

---

## 4. Core User Stories

### Creator

- As a creator, I want to create an account so I can manage my products.
- As a creator, I want to create a product so customers can see what I'm selling.
- As a creator, I want to upload product images.
- As a creator, I want to set a price.
- As a creator, I want to publish or unpublish a product.
- As a creator, I want a public storefront where customers can see my products.
- As a creator, I want to see orders placed for my products.
- As a creator, I want to update the status of an order.

### Customer

- As a customer, I want to browse available products.
- As a customer, I want to view a product's details.
- As a customer, I want to see who created or sells the product.
- As a customer, I want to place an order.
- As a customer, I want confirmation that my order was successfully submitted.

---

## 5. MVP Features

### 5.1 Authentication

Creators can create an account and log in.

#### Required

- Sign up
- Login
- Logout
- Basic creator profile

#### Creator Profile

- Name
- Username
- Profile image
- Short bio

No elaborate creator profiles are required for V1.

---

### 5.2 Creator Dashboard

After logging in, a creator has access to a simple dashboard.

#### Dashboard sections

- Products
- Orders
- Basic profile/settings

The dashboard should prioritize functionality over visual complexity.

---

### 5.3 Product Management

Creators can create and manage products.

#### Product fields

- Product name
- Description
- Price
- Images
- Creator
- Status
- Created date

#### Product status

- `DRAFT`
- `PUBLISHED`

#### Creator actions

- Create product
- Edit product
- Delete product
- Publish product
- Unpublish product

#### Explicitly excluded

- Product variants
- Sizes
- Colors
- SKU management
- Inventory management
- Discounts
- Coupons
- Product reviews
- Ratings

---

### 5.4 Public Marketplace

Customers can discover published products without accessing the creator dashboard.

#### Marketplace

The marketplace displays published products.

Each product card should show:

- Image
- Name
- Price
- Creator

#### Product page

The product detail page contains:

- Product images
- Product name
- Description
- Price
- Creator information
- Order button

The marketplace does not need sophisticated discovery for MVP.

#### Search

Search is optional for the first release.

If implementing it significantly increases development time, defer it. A basic product feed is sufficient.

---

### 5.5 Creator Storefront

Each creator gets a public storefront.

Example:

`merchhub.com/@creator`

The storefront contains:

- Creator profile
- Creator bio
- Published products

Customers can navigate from the storefront to individual products.

The storefront establishes that creators have a recognizable presence on the platform rather than simply listing products in a generic marketplace.

---

### 5.6 Ordering

The customer can place an order from a product page.

For MVP, the ordering experience should be deliberately simple.

#### Customer provides

- Name
- Phone number
- Delivery address
- Email (optional)

#### Order contains

- Customer information
- Product
- Creator
- Quantity
- Unit price
- Total
- Status
- Created date

For MVP:

> One order = one product.

This removes unnecessary cart complexity.

---

### 5.7 Order Status

Creators can update an order's status.

#### MVP statuses

- `PENDING`
- `CONFIRMED`
- `COMPLETED`
- `CANCELLED`

Initial state:

`PENDING`

The creator can update the status from the orders dashboard.

No complex fulfillment workflow is required.

---

## 6. Payments

### MVP Decision

Payment processing is **out of scope for the initial MVP** unless it is absolutely necessary for the validation goal.

The first version can establish that:

> Customers can discover products and submit orders.

Payment can be introduced in a subsequent iteration once the ordering flow has been validated.

If payment is required for the launch scenario, integrate one payment provider only.

Do not build:

- Multiple gateways
- Wallets
- Refund systems
- Subscription payments
- Payment splitting

---

## 7. Notifications

Notifications are out of scope for MVP.

Creators can see new orders directly in the dashboard.

Future flow:

`New Order → Notification → Creator`

MVP flow:

`New Order → Orders Dashboard`

---

## 8. Admin

A sophisticated admin platform is not required.

For MVP, administration can be minimal.

Potential capabilities:

- View users
- View products
- Remove inappropriate products or users if necessary

If administration is not required for the initial testing environment, it can be deferred.

---

## 9. MVP Screens

### Public

1. Landing page
2. Marketplace
3. Product page
4. Creator storefront
5. Order page
6. Order confirmation

### Authentication

7. Sign up
8. Login

### Creator

9. Dashboard
10. Products
11. Create product
12. Edit product
13. Orders
14. Profile/settings

---

## 10. Basic Navigation

### Customer

```text
Home
  ↓
Marketplace
  ↓
Product
  ↓
Order
  ↓
Confirmation
```

### Creator

```text
Login
  ↓
Dashboard
  ├── Products
  │     ├── Create
  │     └── Edit
  │
  ├── Orders
  │
  └── Profile
```

### Creator Storefront

```text
/@username
     ↓
Creator Profile
     ↓
Products
     ↓
Product
```

---

## 11. Data Model

A minimal initial data model can consist of three primary models.

### User

```text
User
├── id
├── name
├── username
├── email
├── password
├── avatar
├── bio
├── createdAt
└── updatedAt
```

### Product

```text
Product
├── id
├── creatorId
├── name
├── description
├── price
├── images
├── status
├── createdAt
└── updatedAt
```

### Order

```text
Order
├── id
├── productId
├── creatorId
├── customerName
├── customerPhone
├── customerEmail
├── deliveryAddress
├── quantity
├── unitPrice
├── total
├── status
├── createdAt
└── updatedAt
```

The schema should remain simple. Do not introduce abstractions purely because we might need them later.

---

## 12. Technical Direction

The existing MerchHub stack can remain:

### Frontend

- Next.js
- React
- Tailwind CSS

### Backend / Data

- MongoDB
- Existing API architecture where practical

### Authentication

Keep authentication simple and secure.

### Image Storage

Use the existing image-storage approach if already established.

The architecture should support the MVP without attempting to solve hypothetical scale problems.

---

## 13. Non-Goals

The following are explicitly **not part of MerchHub MVP V1**.

### Marketplace

- Advanced search
- Advanced filtering
- Recommendations
- Trending products
- Personalized feeds
- Sophisticated category systems

### Creator Features

- Analytics
- Sales charts
- Follower system
- Creator verification
- Creator subscriptions
- Creator tiers
- Advanced earnings dashboards

### Commerce

- Shopping cart
- Multiple-product orders
- Product variants
- Inventory management
- Discount codes
- Coupons
- Wishlists
- Reviews
- Ratings
- Refund management

### Social

- Messaging
- Comments
- Likes
- Follows
- Social feed
- Sharing system

### Payments

- Multiple payment providers
- Wallets
- Payment splitting
- Escrow
- Payout infrastructure

### Logistics

- Delivery tracking
- Rider marketplace
- Delivery integrations
- Automated shipping calculations

### Platform

- Advanced admin system
- Recommendation engine
- Complex notification infrastructure
- Advanced analytics
- Mobile application

> **If a feature does not help complete the core loop, it does not belong in MVP V1.**

---

## 14. MVP Success Criteria

The MVP is complete when the following flow can be performed successfully from beginning to end.

### Creator

1. Create an account.
2. Create a storefront.
3. Create a product.
4. Upload a product image.
5. Publish the product.

### Customer

6. Discover the product.
7. Open the product page.
8. View the creator.
9. Submit an order.

### Creator

10. See the order in the dashboard.
11. Confirm the order.
12. Mark it completed.

If this flow works reliably, **MerchHub MVP V1 is done.**

Not almost done.

Done.

---

## 15. Development Principle

We should deliberately avoid building the future MerchHub while building MVP V1.

When a new feature idea comes up during development, it should be recorded in a **Post-MVP Backlog** rather than immediately implemented.

Example backlog:

- Payments
- Cart
- Product variants
- Reviews
- Search
- Categories
- Analytics
- Notifications
- Creator following
- Messaging
- Inventory
- Delivery
- Recommendations

These ideas can be revisited after V1 ships.

They do not affect the current definition of done.

---

## 16. Product Development Loop

The development process for MerchHub should follow the same lean approach that worked for Wave:

**Define → Design → Build → Finish → Ship → Learn → Improve**

The purpose of MVP V1 is not to prove that we can build a sophisticated marketplace.

The purpose is to prove that MerchHub can go from zero to a functioning product-and-order loop and actually ship.

Once that exists, every subsequent feature is an intentional iteration rather than part of an endlessly expanding first release.

---

## 17. Definition of Done

MerchHub MVP V1 is done when:

- [ ] A creator can register and log in.
- [ ] A creator can create and edit a profile.
- [ ] A creator can create a product.
- [ ] A creator can upload product images.
- [ ] A creator can publish and unpublish products.
- [ ] A public creator storefront exists.
- [ ] Customers can browse published products.
- [ ] Customers can view product details.
- [ ] Customers can view the creator.
- [ ] Customers can submit an order.
- [ ] Customers receive an order confirmation.
- [ ] Creators can see their orders.
- [ ] Creators can update order status.
- [ ] The complete creator-to-customer-to-order loop works.
- [ ] The application is deployed and usable outside the local development environment.

**Once these are complete, stop building MVP V1 and ship it.**
