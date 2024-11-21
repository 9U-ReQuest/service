FROM node:20-alpine AS base

FROM base AS builder
RUN apk update
RUN apk add --no-cache libc6-compat
# Set working directory
WORKDIR /app

RUN corepack enable
RUN pnpm add --save-dev turbo@^2
COPY . .

RUN pnpx turbo prune "@request/gasi" --docker

# Add lockfile and package.json's of isolated subworkspace
FROM base AS installer
RUN apk update
RUN apk add --no-cache libc6-compat
WORKDIR /app

# First install the dependencies (as they change less often)
COPY --from=builder /app/out/json/ .
RUN corepack enable
RUN pnpm install
RUN pnpm build --filter="@request/specs"

# Build the project
COPY --from=builder /app/out/full/ .
RUN pnpm build --filter="@request/gasi"

FROM gcr.io/distroless/nodejs20-debian12
WORKDIR /app

COPY --from=installer /app ./

EXPOSE 8080/tcp
WORKDIR /app/apps/gasi
CMD ["./dist/index.js"]