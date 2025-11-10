# Backend — Minimal Demo (Teacher-friendly)

This is a small Node.js/Express backend used for the Smart Hospital Appointment Booking System demo.

Quick run (recommended for demo):

```bash
cd backend
npm install
node migrate.js   # create DB and demo data
node index.js     # start API on http://localhost:3001
```

Demo credentials (seeded by migrations):
- Patient: alice@example.com / Password123!
- Doctor: dr.john@example.com / Password123!

Notes:
- The backend exposes these endpoints that are useful for the demo:
	- POST /auth/register
	- POST /auth/login  -> returns { token }
	- GET /me           -> needs Authorization: Bearer <token>
	- GET /doctors      -> public list of doctors
	- GET /appointments -> protected, lists appointments for current user
	- POST /appointments -> protected, create an appointment (patient uses token)
- JWT secret defaults to `please_change_this_secret`. For production use set `JWT_SECRET` env var.

If you want a clean demo, run `node migrate.js` before starting the server to recreate tables and seed sample data.
