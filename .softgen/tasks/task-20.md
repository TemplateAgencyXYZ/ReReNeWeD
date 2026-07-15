---
title: Customer-facing pages and purchase flow
status: in_progress
priority: urgent
type: feature
tags: [customer, pages, checkout, orders]
created_by: agent
created_at: 2026-07-15T22:00:00Z
position: 20
---
## Notes
Part 1 rebuild. Create missing customer pages and wire the full purchase flow end-to-end.

## Checklist
- [ ] Create /about page using site_content "about_page"
- [ ] Create /settings page for logged-in users (name, phone, password, saved addresses)
- [ ] Create /orders index page showing logged-in customer's order history
- [ ] Merge /categories into /products as filter tabs (Writing Tools / Paper Goods / Journals & Diaries)
- [ ] Update Navigation so "Shop" and "Categories" become one "Shop" link
- [ ] Wire product → cart → checkout (address + phone) → Razorpay payment → order created → confirmation page
- [ ] Fix /api/razorpay-order.ts to allow customer orders, remove admin-only guard, pass user into handlers
- [ ] Ensure /orders/[id] verifies payment and updates order status on success
- [ ] Add placeholder images for products missing photos