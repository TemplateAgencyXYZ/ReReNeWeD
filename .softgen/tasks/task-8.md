---
title: Razorpay integration
status: in_progress
priority: urgent
type: feature
tags: [frontend, payments, razorpay]
created_by: agent
created_at: 2026-05-20T15:05:00Z
position: 8
---

## Notes
The user is based in India and requires Razorpay instead of Stripe. We need to rip out the Stripe implementation in the checkout flow and replace it with Razorpay checkout integration.

## Checklist
- [x] Remove Stripe dependencies and code from `checkout.tsx`
- [x] Add Razorpay script loading to the checkout flow
- [x] Implement Razorpay payment modal invocation on checkout submit
- [x] Update `.env.local` instructions in UI/comments to specify `NEXT_PUBLIC_RAZORPAY_KEY_ID`
- [x] Handle successful payment response to trigger `orderService.createOrder`