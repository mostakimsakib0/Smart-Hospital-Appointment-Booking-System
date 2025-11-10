# Week 2 — Backend: Modules & I/O

This document lists the planned backend modules and the expected I/O for Week 2 deliverable.

## Overview
Language: Node.js
Framework: Express
DB: SQLite (development)

## Modules

1. auth
   - Responsibility: user authentication and session/token handling
   - Endpoints:
     - POST /auth/register
       - Request: { name, email, password }
       - Response: 201 { id, name, email }
       - Errors: 400 (validation), 409 (email exists)
     - POST /auth/login
       - Request: { email, password }
       - Response: 200 { token, user: { id, name, email } }
       - Errors: 400 (validation), 401 (invalid credentials)

2. users
   - Responsibility: user profile CRUD
   - Endpoints:
     - GET /users/:id
       - Response: 200 { id, name, email, role }
       - Errors: 404
     - PUT /users/:id
       - Request: { name, email, ... }
       - Response: 200 { updated user }

3. doctors
   - Responsibility: doctor profiles, specialties
   - Endpoints:
     - GET /doctors
       - Response: 200 [{ id, name, specialty, rating }]
     - GET /doctors/:id
       - Response: 200 { id, name, specialty, schedule }

4. appointments
   - Responsibility: create/list/update/cancel appointments
   - Endpoints:
     - GET /appointments?userId=...
       - Response: 200 [{ id, patientId, doctorId, datetime, status }]
     - POST /appointments
       - Request: { patientId, doctorId, datetime, reason }
       - Response: 201 { id, ... }
       - Errors: 400 (validation), 409 (slot not available)
     - PUT /appointments/:id
       - Request: { datetime, status }
       - Response: 200 { updated }
     - DELETE /appointments/:id
       - Response: 204

5. db (data access)
   - Responsibility: abstract SQLite queries; migrations/seeds
   - Interfaces:
     - connect(), run(query, params), get(query, params), all(query, params)

6. models
   - Responsibility: define table schema mappings and simple helpers

7. controllers
   - Responsibility: implement business logic for each route using models and db

8. middlewares
   - Responsibility: auth middleware (verify token), input validation, error handler

9. utils
   - Responsibility: helpers (date/time, validation schemas, logger)

## I/O details — example shapes

- User register request
  - POST /auth/register
  - Body: { name: string, email: string, password: string }

- Appointment create
  - POST /appointments
  - Body: { patientId: number, doctorId: number, datetime: ISOString, reason?: string }
  - Response: 201 { id: number, patientId, doctorId, datetime, status: "scheduled" }

## Status codes & errors
- 200 OK — successful GET/PUT
- 201 Created — resource created
- 204 No Content — successful delete
- 400 Bad Request — validation failed
- 401 Unauthorized — missing/invalid token
- 403 Forbidden — insufficient permissions
- 404 Not Found — resource missing
- 409 Conflict — business conflict (slot taken, duplicate email)

## Next steps (Week 3 prep)
- Create ER diagram based on entities: users, doctors, appointments, specialties, roles
- Define SQL schema and migration scripts
