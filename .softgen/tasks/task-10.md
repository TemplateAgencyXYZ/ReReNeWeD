---
title: Dynamic homepage controls
status: in_progress
priority: medium
type: feature
tags: [admin, frontend, database]
created_by: agent
created_at: 2026-05-20T15:05:00Z
position: 10
---

## Notes
The admin needs the ability to control what shows up on the homepage ("Featured" and "New Arrivals") without editing code. We will add boolean flags to the products table and update the admin product form, then wire the homepage to display based on these flags.

## Checklist
- [x] Execute SQL to add `is_featured` and `is_new_arrival` boolean columns to `products` table (default false)
- [x] Update `database.types.ts` and `productService.ts` to include these new fields
- [ ] Add toggle switches for "Featured" and "New Arrival" in the Admin Product create/edit form (`src/pages/admin/products.tsx`)
- [ ] Update `src/pages/index.tsx` (homepage) to fetch and display products based on these flags instead of latest/random