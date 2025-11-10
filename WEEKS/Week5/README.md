# Week 5 — Sample data, API validation & UI

Week 5 focuses on sample/demo data, validating API responses, and frontend display + form POST.

What is implemented
- Sample data / seeding: `backend/migrate.js` and `backend/seed_demo.js` create roles, a specialty, a demo doctor and a demo patient, plus a demo appointment. (I updated these to use bcrypt-hashed demo passwords.)
- Backend API additions: `POST /appointments` (protected) was added to allow patients to create appointments. See `backend/index.js`.
- Frontend: `frontend/src/pages/AppointmentForm.js` now implements a booking form that fetches `/doctors` and posts to `/appointments` with the token.
- Dashboard: `frontend/src/pages/Dashboard.js` fetches `/me`, `/doctors`, and `/appointments` and displays them.

Demo credentials (seeded):
- Patient: `alice@example.com` / `Password123!`
- Doctor: `dr.john@example.com` / `Password123!`

Suggested checks for validation:
1. Run `node migrate.js` to recreate/seed DB.
2. POST `/auth/login` with seeded credentials to receive a token.
3. Use the token to POST `/appointments` and then GET `/appointments` to ensure the appointment appears.

See `WEEK5_REPORT.md` for a short status report and remaining suggestions.
