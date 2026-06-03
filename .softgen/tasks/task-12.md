---
title: Product Image Uploads via Supabase Storage
status: in_progress
priority: high
type: feature
tags: [admin, storage, images]
created_by: agent
created_at: 2026-06-03T15:24:00Z
position: 12
---

## Notes
The `product-images` public storage bucket is created. We need to implement the frontend upload interface in the Admin Dashboard and link the uploaded URLs to the `products` table.

## Checklist
- [ ] Create a UI component (`ImageUploader`) for uploading images using the Supabase Storage SDK
- [ ] Update the Admin Products form (`src/pages/admin/products.tsx`) to integrate the image upload component
- [ ] On upload success, retrieve the public URL from the `product-images` bucket
- [ ] Save the public URLs into the `images` array column when creating or updating a product
- [ ] Display thumbnail previews of the uploaded images in the Admin Products form
- [ ] Ensure the frontend product pages (`src/pages/products/[id].tsx`) safely render these Supabase Storage URLs