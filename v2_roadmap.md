# MerchHub V2 Feature Roadmap

> Saved: 2026-09-04. This is a living document. Priority tiers may shift as V2 planning progresses.

The core focus of V2 is transitioning MerchHub from a basic marketplace into a **high-hype, creator-driven commerce platform**, while significantly upgrading logistics and buyer discovery.

---

## Flagship Feature: "Drops"

Creators schedule limited-edition releases to go live at a specific date and time, leveraging anticipation and scarcity.

### User-Facing
- Pre-Drop Product Page: Countdown timer, product details visible, Buy button locked until the scheduled time.
- Waitlist & Reminders: Buyers opt-in to receive email/SMS 15 minutes before a drop.
- Scarcity Indicators: Live inventory counter during the drop.
- Drop Storefront Section: Upcoming Drops section on creator storefront and marketplace homepage.

### Engineering Concerns
- Atomic Inventory Reservation: Strict Prisma transactions or Redis-based pessimistic locking to prevent overselling.
- Virtual Waiting Room: Queue-based checkout flow (BullMQ/Kafka) to prevent DB overwhelm at drop launch.
- Scheduled Jobs: Cron/job system to flip a Drop from SCHEDULED to LIVE at exactly the right time.

---

## Advanced Logistics & Collection Centers

- Structured Address Model: Country, State, City, Postal Code, Delivery Method (Door / Collection Center).
- Collection Center Directory: Seeded database of known pickup centers per country and state.
- Shipping Cost Calculation: Dynamic cost applied at checkout based on collection center / state zone.
- Door vs. Pickup Toggle: Buyers choose at checkout; creators may restrict to one method.

---

## 1-Click Checkout (Saved Addresses)

Critical for Drops — a buyer filling out their address during a live drop will miss it.

- Saved Buyer Profile: Authenticated buyers can save preferred collection center or delivery address.
- 1-Click Checkout: Single-click purchase for buyers with a saved address.
- Multiple Address Management: Save multiple addresses, select a default.

---

## ElasticSearch & Advanced Discovery

- Multi-Entity Search: Across products, creators, and categories simultaneously.
- Typo Tolerance: Fuzzy matching.
- Faceted Filtering: Instant filter by price, availability, creator — no page reload.
- Autocomplete: Live dropdown suggestions.
- Drop-Aware Search: Upcoming Drops surfaced in search results.

---

## Recommendation Engine & Personalization

- More from this Creator on every product detail page.
- Customers Also Bought — cross-sell based on order item co-occurrence.
- Personalized Feed — homepage ranked by browsing/purchase history.

---

## Followership System

- Buyers follow creators to receive notifications for new products and upcoming Drops.
- Follower count on creator storefront as a social signal.
- Follows power the personalized feed.

---

## Wishlists & Restock Alerts

- Buyers save products to a wishlist.
- Opted-in buyers notified when a sold-out product is restocked.

---

## Social & Engagement

- Post-purchase product reviews (to prevent spam).
- Shareable pre-launch Drop URLs with countdown OG preview cards.

---

## Priority Tiers

| Feature | Priority |
|---|---|
| Drops | Must-Have V2 |
| Collection Centers / Logistics | Must-Have V2 |
| 1-Click Checkout | Must-Have V2 |
| ElasticSearch | Strong V2 |
| Followership System | Strong V2 |
| Recommendation Engine | V2.1 |
| Wishlists / Restock Alerts | V2.1 |
| Social (Reviews, Sharing) | V2.1 |
