# Stage 1: Build
FROM node:22 AS builder
WORKDIR /app
COPY ../../package.json  ../../package-lock.json ./
RUN npm install
COPY ../../ ./
RUN npm run build:customer
FROM node:22 AS runner
WORKDIR /app
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/dist/apps/customer ./dist
COPY ../../config.yaml /config.yaml

ENV NODE_ENV production
EXPOSE 3001
CMD ["node", "dist/main"]
