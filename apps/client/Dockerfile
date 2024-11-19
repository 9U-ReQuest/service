FROM oven/bun AS bun
WORKDIR /app

FROM oven/bun:distroless AS bun-distroless
WORKDIR /app

# =============== INSTALL & BUILD =================

FROM oven/bun AS builder
ARG BUN_PKG_MANAGER
COPY . .

RUN bun install
RUN bunx turbo build --filter="@request/client"

# ================== RELEASE ======================

FROM oven/bun:distroless AS release
COPY --from=builder /app .
EXPOSE 80/tcp
WORKDIR /app/apps/client
ENTRYPOINT [ "bun", "run", "start" ]