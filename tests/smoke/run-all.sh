#!/usr/bin/env bash
set -eu
BASE=http://localhost:4000

echo "Health check:"
curl -s $BASE/api/health | jq .

echo "List doctors:"
curl -s $BASE/api/doctors | jq .

echo "Login seeded user:"
TOK=$(curl -s -X POST $BASE/api/auth/login -H "Content-Type: application/json" -d '{"email":"patient@example.com","password":"password123"}' | jq -r .token)
echo "Token: ${TOK}"

echo "Book an appointment (will likely succeed):"
curl -s -X POST $BASE/api/appointments -H "Content-Type: application/json" -H "Authorization: Bearer ${TOK}" -d '{"doctorId":1,"date":"2025-12-01","time":"10:00"}' | jq .

echo "Get my appointments:"
curl -s -H "Authorization: Bearer ${TOK}" $BASE/api/appointments | jq .

echo "Done."
