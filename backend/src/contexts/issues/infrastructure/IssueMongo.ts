import mongoose from 'mongoose';

const IssueMongoSchema = new mongoose.Schema({
  issueId: { type: String, required: true },
  description: { type: String },
  estimation: { type: Number },
  type: { type: String, required: true },
  alone: { type: Boolean, required: true },
  done: { type: Boolean, required: true },
});
const IssueMongoModel = mongoose.model('Issue', IssueMongoSchema);
export { IssueMongoModel };
