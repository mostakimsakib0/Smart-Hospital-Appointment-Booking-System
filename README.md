# Smart Hospital Appointment Booking System — Week 1 Submission

This repository contains minimal frontend and backend implementations created for Week 1 tasks.

Frontend (Md. Saiful Islam):
- Repo setup
- Install React
- Hello-world page

Backend (Md. Mostakim Ahmed Sakib):
- Repo setup
- Install packages & DB
- Hello-world API

How to run locally:

## Smart Hospital Appointment Booking System — Show & Demo

For a short teacher demo, see the `SHOWCASE.md` file for step-by-step presentation notes, demo credentials, and minimal run commands.

Files of interest:
- `backend/` — Node/Express API (authentication, doctors, appointments)
- `frontend/` — React app (Login, Register, Dashboard, Book appointment)

If you want to run locally:

1) Start backend

```bash
cd backend
npm install
node migrate.js   # creates DB and demo data
node index.js     # starts API on :3001
```

2) Start frontend

```bash
cd frontend
npm install
npm start         # runs on :3000, proxied to backend
```

Then open http://localhost:3000. For a concise demo script and demo credentials, open `SHOWCASE.md`.