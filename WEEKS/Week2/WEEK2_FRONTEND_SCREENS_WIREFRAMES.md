```markdown
# Week 2 — Frontend: Screens & Wireframes

This document lists the frontend screens we plan to build and low-fidelity wireframes for Week 2.

## Screens list

1. Login
   - Purpose: authenticate users
   - Main elements: email, password, login button, link to register

2. Register
   - Purpose: sign up new users
   - Main elements: name, email, password, confirm password, submit

3. Homepage / Dashboard
   - Purpose: show upcoming appointments, quick actions
   - Main elements: navbar, welcome message, upcoming appointments list, "Book appointment" CTA

4. Appointment Form
   - Purpose: book a new appointment
   - Main elements: select doctor (dropdown), date/time picker, reason, submit

5. Appointments List
   - Purpose: view & manage existing appointments
   - Main elements: list of appointments with status, buttons to edit/cancel

6. Doctor Profile
   - Purpose: view doctor's details and available time slots
   - Main elements: name, specialty, bio, available slots, book button

7. Profile / Settings
   - Purpose: view/edit user profile
   - Main elements: name, email, role, save

8. Admin Dashboard (optional)
   - Purpose: admin summary, user/doctor management

## Low-fidelity wireframes (ASCII)

1) Login

---------------------------------
| Logo                          |
|-------------------------------|
| Email: [____________________] |
| Password: [_________________] |
| [ Login ]     [ Register ]    |
---------------------------------

2) Homepage / Dashboard

-----------------------------------------------
| Navbar: Home | Book | Appointments | Profile |
|---------------------------------------------|
| Welcome, <User>                               |
| Upcoming Appointments:                        |
| - Dr. A — 2025-11-12 10:00  [View | Cancel]   |
| - Dr. B — 2025-11-20 15:30  [View | Cancel]   |
|                                             |
| [ Book new appointment ]                    |
-----------------------------------------------

3) Appointment Form (compact)

---------------------------------
| Select doctor: [Dr. A v]      |
| Date: [YYYY-MM-DD]            |
| Time: [HH:MM]                 |
| Reason: [__________________]  |
| [ Submit ]                    |
---------------------------------

## Notes & Data mapping
- Login/Register map to `/auth` endpoints.
- Appointment form fields map to `appointments` table: patientId, doctorId, datetime, reason.
- Screens should be responsive and accessible (labels, ARIA where needed).

## Next steps
- Produce higher-fidelity wireframes (Figma/Sketch) if needed.
- Implement placeholder/dummy pages for navigation testing in Week 3.

```