FROM node:20-alpine
WORKDIR /app
RUN apk add --no-cache openssl libc6-compat
COPY package.json package-lock.json* ./
RUN npm install
COPY . .
RUN npx prisma generate && npm run build
EXPOSE 3001
CMD ["sh", "-c", "npx prisma migrate deploy && (npm run prisma:seed || echo 'Seed failed, continuing startup') && node dist/main.js"]
