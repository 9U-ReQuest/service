FROM alpine
WORKDIR /app

RUN apk add --no-cache git github-cli tar jq aws-cli curl
RUN git --version && gh --version && jq --version && aws --version

WORKDIR /app
COPY ./apps/gasi/make-repo.sh /app/make-repo.sh

WORKDIR /app
RUN chmod +x /app/make-repo.sh
CMD ["sh", "/app/make-repo.sh"]

