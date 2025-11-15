# Medilink — Weekly Progress (3-slide summary)

---

## Slide 1 — Project Overview

- Title: Medilink — Smart Hospital Appointment Booking System
- Goal: Build a full-stack app (backend API + frontend UI) to register patients, list doctors, and book appointments.
- Repo structure: `/backend` (Express + Sequelize + SQLite), `/frontend` (React + Vite + Bootstrap), `/docs` (weekly logs).

---

## Slide 2 — Weekly Milestones (high level)

- Week 1: Repo scaffold, hello-world API, basic React app
- Week 2–3: API I/O design, ER diagram, DB schema, migrations
- Week 4–6: Routing, auth (JWT), register/login, booking APIs
- Week 7–9: Integration tests, docs, UI polish, Docker + presentation

---

## Slide 3 — Demo Steps

1. Start app (Docker): `docker compose up --build`
2. Visit frontend: `http://localhost:5173`
3. Login: `patient@example.com / password123` or register new user
4. Browse doctors, view profile, book appointment
5. Open `My Appointments` to view or cancel bookings
