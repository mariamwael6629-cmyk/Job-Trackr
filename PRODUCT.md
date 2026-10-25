# Product

<!-- impeccable:product-schema 1 -->

> Inferred from the README and `frontend/index.html`. The owner asked the redesign to proceed on inferred context; treat each line as an assumption until confirmed.

## Platform

web

## Users
Job seekers in the middle of a search: dozens of applications, recruiter calls, interviews, follow-ups. They check the tracker daily, often on a laptop between applications, and want to know what needs doing next.

## Product Purpose
JobTrackr is a single-page app with a marketing home (features, testimonials, pricing, FAQ), auth, a dashboard (pipeline stats, charts, upcoming interviews), an applications table with CRUD, a drag-and-drop Kanban board, an AI tools hub (resume analysis, job match, cover letters, interview prep, keywords, salary negotiation) proxied through the backend, and a profile with KPIs.

## Capabilities and Constraints
- Single `frontend/index.html` (inline CSS and JS), vendored Chart.js, FastAPI backend with JWT.
- Statuses: Applied, Reviewing, Interview, Offer, Rejected, Hired.
- Supports English and Arabic per the FAQ (copy claim; confirm).

## Brand Commitments
- Name "JobTrackr" and the "JT" mark.

## Evidence on Hand
- Landing numbers (50K+, 2.4×, 98%, 200+), testimonials (Sarah Rodriguez, Marcus Kim, Jasmine Patel) and pricing ($0 / $12 / $49) are placeholder marketing copy. Do not add more.
- Demo account `ahmed.hassan@email.com` / `password123`.

## Product Principles
1. The next action is always visible: who to follow up with, which interview is next.
2. Status colour is a language used the same way everywhere.
3. Encouraging without being cheesy.
