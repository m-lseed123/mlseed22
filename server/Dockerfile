FROM node:18-alpine AS base

RUN npm i -g pnpm

FROM base AS development
ARG APP 
ARG NODE_ENV=development
WORKDIR /usr/src/app 
COPY package.json pnpm-lock.yaml ./
COPY libs ./
RUN pnpm install
COPY . .
RUN pnpm run build auth

FROM base AS production
ARG APP 
ARG NODE_ENV=production
WORKDIR /usr/src/app 
COPY package.json pnpm-lock.yaml ./
RUN pnpm install --prod
COPY --from=development /usr/src/app/dist ./dist
COPY --from=development /usr/src/app/libs ./libs
 
ENV APP_MAIN_FILE=dist/apps/auth/main
CMD node ${APP_MAIN_FILE}
