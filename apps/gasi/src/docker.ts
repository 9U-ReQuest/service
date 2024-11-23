import { TRPCError } from "@trpc/server";
import { docker } from "./index.js";

const ECR_REPOSITORY_URL = process.env.ECR_REPOSITORY_URL;
const GITHUB_TOKEN = process.env.GITHUB_TOKEN;
const AWS_ACCESS_KEY_ID = process.env.AWS_ACCESS_KEY_ID;
const AWS_SECRET_ACCESS_KEY = process.env.AWS_SECRET_ACCESS_KEY;
const REQUEST_ENDPOINT = process.env.REQUEST_ENDPOINT;
const ASSIGNMENT_BUCKET_ID = process.env.ASSIGNMENT_BUCKET_ID;
const SUBMISSION_BUCKET_ID = process.env.SUBMISSION_BUCKET_ID;

export function makeRepository(userName: string, assignmentId: string, submissionId: string) {
  if (!docker || !GITHUB_TOKEN || !ECR_REPOSITORY_URL)
    throw new TRPCError({
      code: "SERVICE_UNAVAILABLE",
      message: "이 서버에서는 github 작업을 지원하지 않습니다.",
    });
  const imageName = `${ECR_REPOSITORY_URL}:make-repo`;
  docker.createContainer({
    Tty: true,
    Image: imageName,
    Env: [
      `GITHUB_TOKEN=${GITHUB_TOKEN}`,
      `AWS_ACCESS_KEY_ID=${AWS_ACCESS_KEY_ID}`,
      `AWS_SECRET_ACCESS_KEY=${AWS_SECRET_ACCESS_KEY}`,
      `REQUEST_ENDPOINT=${REQUEST_ENDPOINT}`,
      `BUCKET_ID=${ASSIGNMENT_BUCKET_ID}`,
      `USER_LOGIN=${userName}`,
      `ASSIGNMENT_ID=${assignmentId}`,
      `SUBMISSION_ID=${submissionId}`,
    ],
    HostConfig: {
      NetworkMode: "gasi",
    },
  });
}
export function submitRepository(submissionId: string) {
  if (!docker)
    throw new TRPCError({
      code: "SERVICE_UNAVAILABLE",
      message: "이 서버에서는 github 작업을 지원하지 않습니다.",
    });
  const imageName = `${ECR_REPOSITORY_URL}:submit-repo`;
  docker.createContainer({
    Tty: true,
    Image: imageName,
    Env: [
      `GITHUB_TOKEN=${GITHUB_TOKEN}`,
      `AWS_ACCESS_KEY_ID=${AWS_ACCESS_KEY_ID}`,
      `AWS_SECRET_ACCESS_KEY=${AWS_SECRET_ACCESS_KEY}`,
      `BUCKET_ID=${SUBMISSION_BUCKET_ID}`,
      `SUBMISSION_ID=${submissionId}`,
    ],
    HostConfig: {
      NetworkMode: "gasi",
    },
  });
}
