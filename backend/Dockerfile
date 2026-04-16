FROM node:20-alpine
WORKDIR /app
RUN apk add --no-cache openssl libc6-compat
COPY package.json package-lock.json* ./
RUN npm install
COPY . .
RUN npx prisma generate && npm run build && chmod +x /app/start.sh
EXPOSE 3001
CMD ["sh", "/app/start.sh"]
