# Week 6 — Update/Delete APIs and JWT testing

Backend:
- Added appointment update (`PUT /api/appointments/:id`) and delete (`DELETE /api/appointments/:id`) endpoints with ownership checks.
- JWT auth enforced for protected routes. See `/backend/src/routes/appointments.js`.

Frontend:
- Login stores JWT in `localStorage`; booking requests include the `Authorization` header.
