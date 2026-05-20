---
title: Design system & navigation
status: in_progress
priority: urgent
type: feature
tags: [frontend, design]
created_by: agent
created_at: 2026-05-20T09:19:53Z
position: 2
---

## Notes
Theme shadcn with botanical-renewal colors. Set up fonts (Newsreader + IBM Plex Sans). Create shared navigation header with cart indicator, user menu. Footer with shop info.

## Checklist
- [ ] Update globals.css with forest green primary, sage accent, custom tokens
- [ ] Configure fonts in tailwind.config.ts
- [ ] Create Navigation component with cart badge
- [ ] Create Footer component
- [ ] Theme Button, Badge, Card components with botanical variants

## Acceptance
- Navigation shows cart item count for logged-in users
- Color palette matches botanical-renewal direction
- Typography is Newsreader (display) + IBM Plex Sans (body)