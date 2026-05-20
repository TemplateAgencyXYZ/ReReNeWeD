---
title: User checkout & payments
status: done
priority: high
type: feature
tags: [frontend, payments, stripe]
created_by: agent
created_at: 2026-05-20T09:19:53Z
position: 4
---

## Notes
Stripe checkout integration. Address selection/creation during checkout. Order confirmation. Payment keys from Supabase environment.

## Checklist
- [x] Stripe Elements integration for card input
- [x] Checkout page with cart summary, address selection
- [x] Address form (new address during checkout)
- [x] Payment processing via Stripe API
- [x] Order confirmation page
- [ ] Email confirmation (Supabase email templates)

## Acceptance
- Users can complete purchase with credit card
- Orders are created with proper status tracking
- Users receive order confirmation