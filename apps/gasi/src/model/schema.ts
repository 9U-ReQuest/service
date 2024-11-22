import mongoose, { Schema } from "mongoose";

const mAuthProviderSchema = new Schema({
  uid: { type: String, unique: true, required: true },
  connectedAt: { type: Date },
});

export const mAssignmentPromptSchema = new Schema({
  fields: { type: [String] },
  techs: { type: [String] },
  companies: { type: [String] },
});

export const mAssignmentSchema = new Schema({
  id: { type: String, unique: true, required: true, index: true },
  name: { type: String, required: true },
  description: { type: String, required: true },
  readme: { type: String, required: true },
  prompt: { type: mAssignmentPromptSchema, required: true },
  status: { type: String, required: true, default: "GENERATING" },
  lastUpdated: { type: Date, required: true, default: Date.now },
});

export const mSubmissionSchema = new Schema({
  id: { type: String, unique: true, required: true, index: true },
  assignmentId: { type: String, unique: true, required: true, index: true },
  status: { type: String, default: "PREPARING" },
  lastUpdated: { type: Date, required: true, default: Date.now },
  expiredAt: { type: Date },
});

export const mReviewScenarioSchema = new Schema({
  id: { type: String, required: true },
  name: { type: String, required: true },
  result: { type: String, required: true },
  score: { type: Number },
});

export const mReviewSchema = new Schema({
  id: { type: String, unique: true, required: true, index: true },
  status: { type: String, required: true },
  scenarios: { type: [mReviewScenarioSchema] },
});

export const mReviewEntrySchema = new Schema({
  submissionId: { type: String, required: true, index: true },
  name: { type: String, required: true },
  result: { type: String, required: true },
  score: { type: Number },
  scenario: { type: String, required: true },
  path: { type: String },
  lineRange: { type: [Number] },
  message: { type: String, required: true },
});

export const mUserSchema = new Schema({
  token: { type: String, unique: true, required: true },
  name: { type: String },
  email: { type: String, unique: true, index: true, sparse: true },
  registered: { type: Boolean, default: false },
  providers: { type: Map, of: mAuthProviderSchema },
  lastGeneratedAssignment: { type: String },
  submissions: { type: [mSubmissionSchema] },
  prompt: { type: mAssignmentPromptSchema },
});
