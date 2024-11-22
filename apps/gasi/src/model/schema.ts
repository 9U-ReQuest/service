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
  name: { type: String, required: true },
  description: { type: String, required: true },
  readme: { type: String, required: true },
  prompt: { type: mAssignmentPromptSchema, required: true },
  status: { type: String, required: true, default: "GENERATING" },
  lastUpdated: { type: Date, required: true, default: Date.now },
});

// biome-ignore lint/suspicious/noExplicitAny: no support native date type in mongoose
export const mSubmissionSchema = new Schema<Submission & { lastUpdated: any; expiredAt: any }>({
  id: { type: String, unique: true, required: true, index: true },
  assignmentId: { type: String, required: true, index: true },
  status: { type: String, default: "PREPARING" },
  lastUpdated: { type: Date, required: true, default: Date.now },
  expiredAt: { type: Date },
});

export const mReviewScenarioSchema = new Schema<ReviewScenario>({
  id: { type: String, required: true },
  name: { type: String, required: true },
  result: { type: String, required: true },
  score: { type: Number },
});

export const mReviewSchema = new Schema<Review>({
  id: { type: String, unique: true, required: true, index: true },
  status: { type: String, required: true },
  scenarios: { type: [mReviewScenarioSchema] },
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
  submissions: { type: [{ type: Schema.Types.ObjectId, ref: "Submission" }] },
  prompt: { type: mAssignmentPromptSchema },
});
