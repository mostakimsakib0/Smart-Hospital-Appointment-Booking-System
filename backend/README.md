# Backend — Medilink API

Requirements: Node 18+ and npm

Quick start (from repo root):

```bash
cd backend
npm install
npm run dev
```

The server runs on `http://localhost:4000` and exposes these endpoints (examples):

- `GET /api/health` — health check
- `POST /api/auth/register` — register patient
- `POST /api/auth/login` — login (returns JWT)
- `GET /api/doctors` — list doctors
- `GET/POST /api/appointments` — manage appointments (requires JWT)
