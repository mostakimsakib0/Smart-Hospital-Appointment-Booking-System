# Week 2 — Design & I/O (Backend) / Screens & Wireframes (Frontend)

Backend tasks:
- List modules/services: Auth, Users, Doctors, Appointments, Database, Middleware, Seed, Tests.
- Define I/O for key APIs (examples):

POST /api/auth/register
Request: { name, email, password }
Response: { id, name, email }

POST /api/auth/login
Request: { email, password }
Response: { token, user }

GET /api/doctors
Response: [ { id, name, specialty, bio } ]

POST /api/appointments
Headers: Authorization: Bearer <token>
Request: { doctorId, date, time }
Response: { id, doctorId, date, time, status }

Frontend tasks:
- List screens: Home, Register, Login, Doctors, Book Appointment, My Appointments, Profile.
- Simple wireframes: use HTML mockups in `/frontend/src/pages` (created simple pages as placeholders).
