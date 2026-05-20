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
- [x] Set up profiles table with is_admin role
- [x] Create products table (name, description, price, images array, stock, category, recycled_from)
- [x] Create categories table
- [x] Create cart_items table (user → product relationship)
- [x] Create addresses table (shipping/billing)
- [x] Create orders table (with status tracking)
- [x] Create order_items table (order line items)
- [x] Apply RLS policies (admin overrides, user owns their data)
- [x] Set up auth trigger for profile creation
- [x] Create admin check function for policies

## Acceptance
- Users can sign up and profiles are auto-created
- Admin users have elevated permissions
- All tables have proper RLS protection