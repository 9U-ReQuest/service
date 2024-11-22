import mongoose, { Model } from "mongoose";
import {
  mAssignmentSchema,
  mReviewEntrySchema,
  mReviewSchema,
  mSubmissionSchema,
  mUserSchema,
} from "./schema.js";

export const mUser = mongoose.model("User", mUserSchema);

export const mAssignment = mongoose.model("Assignment", mAssignmentSchema);

export const mSubmission = mongoose.model("Submission", mSubmissionSchema);

export const mReviewEntry = mongoose.model("ReviewEntry", mReviewEntrySchema);

export const mReview = mongoose.model("Review", mReviewSchema);
