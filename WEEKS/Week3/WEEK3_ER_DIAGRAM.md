```markdown
# Week 3 — Backend: ER Diagram

This document outlines the Entity-Relationship model for the Smart Hospital Appointment Booking System.

Entities:
- users (patients and staff)
- roles (user roles: patient, doctor, admin)
- doctors (profile details, links to users)
- specialties (doctor specialties)
- appointments
- timeslots (optional: pre-defined doctor availability slots)

Relationships (high level):
- users (1) — (M) appointments (a user can have many appointments)
- doctors (1) — (M) appointments (a doctor can have many appointments)
- doctors (M) — (1) specialties (a doctor has one primary specialty; can be many-to-many if needed)
- users (1) — (1) roles

ASCII ER sketch:

  [users] 1------M [appointments] M------1 [doctors]
     |                                    |
     |1                                   |1
     +--1 [roles]                         +--M [specialties]

Fields (high level):
- users: id, name, email, password_hash, role_id, created_at
- roles: id, name
- doctors: id, user_id (FK to users), specialty_id, bio, rating
- specialties: id, name
- appointments: id, patient_id (FK users), doctor_id (FK doctors), datetime, status, reason, created_at

Notes:
- Using a separate `doctors` table allows storing doctor-specific metadata while keeping `users` generic.
- If doctors can have multiple specialties, convert `specialties` into a many-to-many with a join table `doctor_specialties`.

Next: translate these entities into SQL CREATE TABLE statements and consider indexes on foreign keys and datetime for appointment queries.

```