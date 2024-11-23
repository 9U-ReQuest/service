import type {
  Assignment,
  AssignmentPromptSchema,
  Review,
  ReviewEntry,
  ReviewScenario,
  Submission,
  User,
} from "@request/specs";
import { Schema } from "mongoose";

const mAuthProviderSchema = new Schema({
  uid: { type: String, unique: true, required: true },
  connectedAt: { type: Date },
});

export const mAssignmentPromptSchema = new Schema<AssignmentPromptSchema>({
  fields: { type: [String] },
  techs: { type: [String] },
  companies: { type: [String] },
});

// biome-ignore lint/suspicious/noExplicitAny: no support native date type in mongoose
export const mAssignmentSchema = new Schema<Assignment & { lastUpdated: any }>({
  id: { type: String, unique: true, required: true, index: true },
  name: { type: String },
  description: { type: String },
  readme: { type: String },
  prompt: { type: mAssignmentPromptSchema, required: true },
  status: { type: String, required: true, default: "GENERATING" },
  lastUpdated: { type: Date, required: true, default: Date.now },
});

export const mSubmissionSchema = new Schema<
  // biome-ignore lint/suspicious/noExplicitAny: no support native date type in mongoose
  Submission & { userId: any; lastUpdated: any; expiredAt: any }
>({
  id: { type: String, unique: true, required: true, index: true },
  userId: { type: Schema.Types.ObjectId, ref: "User", required: true, index: true },
  assignmentId: { type: String, required: true },
  status: { type: String, default: "PREPARING" },
  repoUrl: { type: String },
  lastUpdated: { type: Date, required: true, default: Date.now },
  expiredAt: { type: Date },
});

export const mReviewScoresSchema = new Schema<{
  accuracy: number;
  logic: number;
  efficiency: number;
  consistency: number;
}>({
  accuracy: { type: Number, required: true },
  logic: { type: Number, required: true },
  efficiency: { type: Number, required: true },
  consistency: { type: Number, required: true },
});

export const mReviewSchema = new Schema<Review>({
  id: { type: String, unique: true, required: true, index: true },
  status: { type: String, required: true },
  summary: { type: String, required: true },
  scores: { type: mReviewScoresSchema, required: true },
});

export const mReviewEntrySchema = new Schema<ReviewEntry & { submissionId: string }>({
  submissionId: { type: String, required: true, index: true },
  name: { type: String, required: true },
  result: { type: String, required: true },
  score: { type: Number },
  scenario: { type: String, required: true },
  path: { type: String },
  lineRange: { type: [Number] },
  message: { type: String, required: true },
});

export const mUserSchema = new Schema<User & { token: string }>({
  token: { type: String, unique: true, required: true },
  name: { type: String },
  email: { type: String, unique: true, index: true, sparse: true },
  registered: { type: Boolean, default: false },
  providers: { type: Map, of: mAuthProviderSchema },
  lastGeneratedAssignment: { type: String },
  submissions: { type: [{ type: String, ref: "Submission" }] },
  prompt: { type: mAssignmentPromptSchema },
});
