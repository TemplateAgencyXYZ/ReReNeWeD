---
title: Admin CMS for Static Pages
status: in_progress
priority: high
type: feature
tags: [admin, frontend, database, cms]
created_by: agent
created_at: 2026-05-23T14:01:00Z
position: 11
---

## Notes
The admin needs a UI to edit all static pages (FAQ, Contact, Shipping, Returns, Story, Sustainability, Privacy, Terms) without code changes. We will create a database table to store page content and update the admin dashboard and frontend pages to manage and consume this data.

## Checklist
- [x] Create an API route (`src/pages/api/setup-admin.ts`) that creates an admin user (`admin@admin.com` / `admin123`) server-side to bypass client browser fetch errors
- [x] Create `site_content` table in Supabase to store page text and HTML/Markdown content
- [ ] Add a "Content Management" tab to the Admin Dashboard navigation
- [ ] Create forms in the admin area to edit content for Support pages (Contact, Shipping, Returns, FAQ)
- [ ] Create forms in the admin area to edit content for About pages (Story, Sustainability, Privacy, Terms)
- [ ] Update frontend static pages to fetch their content dynamically from the `site_content` table instead of using hardcoded text