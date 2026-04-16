#!/bin/sh
set -u

echo "[startup] Running backend bootstrap..."

MIGRATION_OK=0
ATTEMPTS=15
COUNT=1
while [ "$COUNT" -le "$ATTEMPTS" ]; do
  echo "[startup] Prisma migrate attempt ${COUNT}/${ATTEMPTS}"
  if npx prisma migrate deploy; then
    MIGRATION_OK=1
    break
  fi
  COUNT=$((COUNT + 1))
  sleep 2
done

if [ "$MIGRATION_OK" -ne 1 ]; then
  echo "[startup] WARNING: migrations failed after ${ATTEMPTS} attempts. Continuing startup to avoid container crash."
fi

echo "[startup] Running seed (best effort)..."
if ! npm run prisma:seed; then
  echo "[startup] WARNING: seed failed. Continuing startup."
fi

echo "[startup] Starting NestJS API..."
exec node dist/main.js
