# Install dependencies
FROM node:18 AS deps
WORKDIR /app
COPY package.json package-lock.json* yarn.lock* ./
RUN npm install --production=false

# Build stage
FROM node:18 AS builder
WORKDIR /app

COPY . .
COPY --from=deps /app/node_modules ./node_modules

RUN npx prisma generate
RUN npm run build

# Production runner
FROM node:18 AS runner
WORKDIR /app

ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1

COPY --from=builder /app/next.config.js ./
COPY --from=builder /app/public ./public
COPY --from=builder /app/package.json ./
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/prisma ./prisma

EXPOSE 3000
CMD ["npm", "start"]
