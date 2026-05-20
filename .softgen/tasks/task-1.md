---
title: Database schema & authentication
status: in_progress
priority: urgent
type: feature
tags: [backend, database, auth]
created_by: agent
created_at: 2026-05-20T09:19:53Z
position: 1
---

## Notes
Complete backend foundation: database tables for products, orders, cart, addresses, users with admin role detection. Email/password auth with profile auto-creation. Payment gateway keys stored in Supabase secrets.

## Checklist
- [x] Convert design colors to HSL via terminal
- [ ] Set up profiles table with is_admin role
- [ ] Create products table (name, description, price, images array, stock, category, recycled_from)
- [ ] Create categories table
- [ ] Create cart_items table (user → product relationship)
- [ ] Create addresses table (shipping/billing)
- [ ] Create orders table (with status tracking)
- [ ] Create order_items table (order line items)
- [ ] Apply RLS policies (admin overrides, user owns their data)
- [ ] Set up auth trigger for profile creation
- [ ] Create admin check function for policies

## Acceptance
- Users can sign up and profiles are auto-created
- Admin users have elevated permissions
- All tables have proper RLS protection