# Week 5 Report — Completion & Next Steps

Status: Mostly completed

Completed during Week 5 (or implemented here):
- Seeded sample data (roles, specialty, doctor, patient, appointment) via `backend/migrate.js` and `backend/seed_demo.js`.
- Implemented `POST /appointments` (protected) in `backend/index.js` so a patient can create appointments.
- Implemented frontend booking form in `frontend/src/pages/AppointmentForm.js` which posts to `/appointments` using the JWT token.
- Added `SHOWCASE.md` and simplified READMEs for an easy teacher demo.

Remaining / recommended improvements:
- Automated API validation tests: Add a small test (Node or Jest) to exercise auth, appointment creation, and listing.
- Doctor/appointment management: add endpoints/UI for doctors to view and manage appointment status (approve/cancel).
- Input validation and timezone handling: improve datetime validation and normalize timezone formats on both client and server.
- Secure configuration: set `JWT_SECRET` via environment rather than relying on the default.

How to verify quickly (smoke test):
1. cd backend && node migrate.js
2. node index.js
3. POST /auth/login with `alice@example.com` / `Password123!` to get token
4. POST /appointments with Authorization: Bearer <token> to create an appointment
5. GET /appointments to list created appointments

Conclusion: Week 5 objectives (sample data, display & form POST) are implemented; only automated tests and extended doctor workflows remain as follow-ups.
