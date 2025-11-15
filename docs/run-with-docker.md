# Run Medilink with Docker Compose

Prerequisites: Docker and Docker Compose installed.


From the repository root run (default ports):

```bash
# build and start both services on default ports
docker compose up --build -d

# or use wrapper script with custom ports (example uses backend=5000, frontend=8080)
./scripts/docker-up.sh 5000 8080

# the frontend will be available at http://localhost:5173 (or your provided frontend port)
# the backend API will be available at http://localhost:4000 (or your provided backend port)
```

Notes:
- The frontend container serves the built React app via nginx and proxies `/api` to the backend service.
- SQLite DB is persisted in `backend/data` on the host via a volume.
- To stop and remove containers:

```bash
docker compose down
```
