#!/usr/bin/env bash
docker compose up -d

# Wait for PostgreSQL health check to pass
echo "Waiting for PostgreSQL to be healthy..."
while [ "$(docker inspect --format='{{json .State.Health}}' opwork_postgres | grep -o '"Status":"healthy"')" != '"Status":"healthy"' ]; do
  sleep 2
done
echo "PostgreSQL is healthy"

echo "▶ Running Prisma migrations"
cd ./backend
./node_modules/.bin/prisma migrate deploy
cd ..

npx -y pm2 start ./ecosystem.config.json
echo "✅ Done"


