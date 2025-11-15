# Week 3 — Database design & SQL

ER Design (simple):

User (patients)
- id, name, email, password, role

Doctor
- id, name, specialty, bio

Appointment
- id, doctorId, patientId, date, time, status

SQL schema (see `backend/migrations/schema.sql`). The backend uses Sequelize; the SQL file documents equivalent DDL for presentation.
