#! /bin/bash
# Required env:
# GITHUB_TOKEN
# AWS_ACCESS_KEY_ID, AWS_SECRET_ACCESS_KEY
# BUCKET_ID
# SUBMISSION_ID

# Check credentials
gh auth status
gh auth setup-git

# Make repository read-only
gh api \
  --method PATCH \
  -H "Accept: application/vnd.github+json" \
  -H "X-GitHub-Api-Version: 2022-11-28" \
  "/repos/ReQuest-members/${SUBMISSION_ID}" \
   -f "archived=true"

# clone repository
git clone "https://github.com/ReQuest-members/${SUBMISSION_ID}"

# upload to s3
aws s3 cp "./${SUBMISSION_ID}" "s3://${BUCKET_ID}/${SUBMISSION_ID}" --recursive

# TODO: Make request to gasi for submission is ready to review