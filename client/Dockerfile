FROM node:18-alpine AS base

RUN npm i -g pnpm

FROM base AS development
WORKDIR /app

COPY package.json pnpm-lock.yaml* ./
RUN pnpm install

FROM base AS builder
WORKDIR /app

COPY --from=development ./app/node_modules ./node_modules
COPY . .

RUN pnpm run build 


FROM base AS runner
WORKDIR /app


ENV NODE_ENV production

COPY --from=builder /app/public ./public

# Set the correct permission for prerender cache
RUN mkdir .next

COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static




EXPOSE 3000

ENV PORT 3000

CMD HOSTNAME="0.0.0.0" node server.js
