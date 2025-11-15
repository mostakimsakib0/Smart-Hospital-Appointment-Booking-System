#!/usr/bin/env bash
set -euo pipefail
# Usage: ./scripts/docker-up.sh [backend_port] [frontend_port]
# Example: ./scripts/docker-up.sh 5000 8080

BACKEND_PORT=${1:-4000}
FRONTEND_PORT=${2:-5173}

export BACKEND_PORT
export FRONTEND_PORT

echo "Starting Medilink with BACKEND_PORT=$BACKEND_PORT and FRONTEND_PORT=$FRONTEND_PORT"
docker compose up --build -d --remove-orphans

echo "Services started."
docker compose ps
