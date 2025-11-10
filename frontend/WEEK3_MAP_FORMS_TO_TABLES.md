# Week 3 — Frontend: Map Forms to Tables

This maps frontend forms/fields to the backend tables defined in Week 3.

1. Register form
   - name -> users.name
   - email -> users.email
   - password -> users.password_hash (hash on backend)

2. Login form
   - email -> users.email
   - password -> (sent to backend for verification)

3. Appointment form
   - patient selection (or current user id) -> appointments.patient_id
   - doctor selection -> appointments.doctor_id
   - date/time picker -> appointments.datetime
   - reason -> appointments.reason

4. Doctor profile / create doctor (admin)
   - user_id -> doctors.user_id
   - specialty -> doctors.specialty_id (or doctor_specialties for many-to-many)
   - bio -> doctors.bio

Validation notes:
- email must be valid format; password minimum length 8
- datetime must be an ISO 8601 datetime; check timezone or store in UTC
- Ensure required fields are present before POST
