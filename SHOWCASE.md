# SHOWCASE: How to present this project to the teacher

This file contains a short script and commands to run so the teacher can quickly review the project and see the main features (Week 1–5 progression).

1) Goal — 3–5 minute demo
   - Login as seeded patient and show Dashboard (appointments and list of doctors).
   - Book a new appointment and show it appears in Dashboard.
   - Briefly show backend endpoints (index.js) to indicate implemented APIs.

2) Demo credentials (seeded by migrate):
   - Patient: alice@example.com / Password123!
   - Doctor: dr.john@example.com / Password123!

3) Start (recommended order)

Backend
```bash
cd backend
npm install
node migrate.js   # creates/updates sqlite DB and seeds demo data
node index.js     # start API on http://localhost:3001
```

Frontend
```bash
cd frontend
npm install
npm start         # open http://localhost:3000
```

4) What to click / show
   - Open the app in browser → click Login → use the patient credentials.
   - Show Dashboard: your appointments and list of available doctors.
   - Click Book (or go to /appointment) → choose a doctor, pick a date/time, enter a reason, and submit.
   - Return to Dashboard and show the new appointment listed.

5) Key backend endpoints to point out
   - POST /auth/login
   - POST /auth/register
   - GET /doctors (public)
   - GET /appointments (protected)
   - POST /appointments (protected) — newly added for Week 5

6) Notes for the teacher
   - This repository demonstrates backend routing, authentication (JWT), simple SQLite persistence, and a minimal React frontend wired to the API.
   - For a quick reset, remove `backend/db.sqlite3` and re-run `node migrate.js`.

7) Troubleshooting
   - If login returns "invalid credentials", re-run `node migrate.js` to re-seed users then retry.
   - JWT secret can be set via `JWT_SECRET` env var for more secure testing.

Enjoy the demo!
