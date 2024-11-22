FROM node:20-alpine AS base

FROM base AS builder
RUN apk update
RUN apk add --no-cache libc6-compat
# Set working directory
WORKDIR /app

RUN corepack enable
RUN pnpm add --save-dev turbo@^2
COPY . .

RUN pnpx turbo prune "@request/client" --docker

# Add lockfile and package.json's of isolated subworkspace
FROM base AS installer
RUN apk update
RUN apk add --no-cache libc6-compat
WORKDIR /app

# First install the dependencies (as they change less often)
COPY --from=builder /app/out/json/ .
RUN corepack enable
RUN pnpm install

# Build the project
ARG PRIVATE_GASI_API_URL
ARG NEXT_PUBLIC_KAKAO_CLIENT_ID
ARG NEXT_PUBLIC_KAKAO_REDIRECT_URI
ARG NEXT_PUBLIC_BASE_URI
ENV PRIVATE_GASI_API_URL=${PRIVATE_GASI_API_URL}
ENV NEXT_PUBLIC_KAKAO_CLIENT_ID=${NEXT_PUBLIC_KAKAO_CLIENT_ID}
ENV NEXT_PUBLIC_KAKAO_REDIRECT_URI=${NEXT_PUBLIC_KAKAO_REDIRECT_URI}
ENV NEXT_PUBLIC_BASE_URI=${NEXT_PUBLIC_BASE_URI}
COPY --from=builder /app/out/full/ .
RUN pnpm build
RUN echo "$NEXT_PUBLIC_KAKAO_CLIENT_ID"
RUN echo "$NEXT_PUBLIC_KAKAO_REDIRECT_URI"

FROM gcr.io/distroless/nodejs20-debian12
WORKDIR /app

# Automatically leverage output traces to reduce image size
# https://nextjs.org/docs/advanced-features/output-file-tracing
COPY --from=installer /app/apps/client/.next/standalone ./
COPY --from=installer /app/apps/client/.next/static ./apps/client/.next/static
COPY --from=installer /app/apps/client/public ./apps/client/public

EXPOSE 3000/tcp
CMD ["./apps/client/server.js"]