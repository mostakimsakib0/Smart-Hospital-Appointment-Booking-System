
# Frontend — Minimal Demo (Teacher-friendly)

This React app provides a small UI for the Smart Hospital Appointment Booking System.

Quick run:

```bash
cd frontend
npm install
npm start   # opens http://localhost:3000
```

Notes for demo:
- The frontend uses a proxy to the backend (see `frontend/package.json`).
- Pages included: Login, Register, Dashboard, Book Appointment.
- Use the seeded demo user `alice@example.com / Password123!` to login and show booking flow.

To book an appointment: Login → Book → select doctor & datetime → submit. Dashboard shows appointments.
