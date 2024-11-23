FROM alpine
WORKDIR /app

RUN apk add --no-cache git github-cli tar jq aws-cli curl
RUN git --version && gh --version && jq --version && aws --version

WORKDIR /app
COPY ./apps/gasi/submit-repo.sh /app/submit-repo.sh

WORKDIR /app
RUN chmod +x /app/submit-repo.sh
CMD ["sh", "/app/submit-repo.sh"]

