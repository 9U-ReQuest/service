#! /bin/bash
# Required env:
# GITHUB_TOKEN
# AWS_ACCESS_KEY_ID, AWS_SECRET_ACCESS_KEY
# BUCKET_ID
# ASSIGNMENT_ID, SUBMISSION_ID, USER_LOGIN
# REQUEST_ENDPOINT

# Set git configs
git config --global init.defaultBranch main
git config --global user.name "ReQuest"
git config --global user.email "requestunit.official@gmail.com"
git config --global --add safe.directory "/app/${ASSIGNMENT_ID}"

# Check credentials
gh auth status
gh auth setup-git

# Download assignment from tar
aws s3api get-object --bucket $BUCKET_ID --key $ASSIGNMENT_ID.tar.gz $ASSIGNMENT_ID.tar.gz
# untar
tar -xvf $ASSIGNMENT_ID.tar.gz
# cd to assignment
cd $ASSIGNMENT_ID
rm -rf ./.git

# Create repository
# GitHub CLI api
# https://cli.github.com/manual/gh_api

gh api \
  --method POST \
  -H "Accept: application/vnd.github+json" \
  -H "X-GitHub-Api-Version: 2022-11-28" \
  /orgs/ReQuest-members/repos \
   -f "name=$SUBMISSION_ID" -f "description=${USER_LOGIN}의 ReQuest 과제 저장소" -f "homepage=${REQUEST_ENDPOINT}" -F "private=true"

# push to git repository
git init
git add --all
git commit -m "init: repository"
git branch -M main
git remote add origin "https://github.com/ReQuest-members/${SUBMISSION_ID}"
git push -u origin main
# create submit branch
git switch -c submit
git push -u origin submit

# setup webhook

gh api \
  --method POST \
  -H "Accept: application/vnd.github+json" \
  -H "X-GitHub-Api-Version: 2022-11-28" \
  "/repos/ReQuest-members/${SUBMISSION_ID}/hooks" \
   -f "name=web" -F "active=true" -f "events[]=push" -f "config[url]=${REQUEST_ENDPOINT}/github/webhook" -f "config[content_type]=json" -f "config[insecure_ssl]=0"

# add user to repository

gh api \
  --method PUT \
  -H "Accept: application/vnd.github+json" \
  -H "X-GitHub-Api-Version: 2022-11-28" \
  "/repos/ReQuest-members/${SUBMISSION_ID}/collaborators/${USER_LOGIN}" \
   -f "permission=push"

# TODO: Make request to gasi for submission is ready to start.
