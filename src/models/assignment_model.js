import mongoose, { Schema } from 'mongoose';
// populated from each calendar link
const AssignmentSchema = new Schema({
  type: String,
  params: Schema.Types.Mixed,
  dtstamp: Date,
  uid: { type: String, unique: true, index: true },
  start: Date,
  datetype: String,
  end: Date,
  class: String,
  description: String,
  sequence: String,
  summary: String, // this has format "some words [class ID]"
  url: String,
  summaryObject: Schema.Types.Mixed,
  courseUrl: String,
  timeblocks: [{ type: Schema.Types.ObjectId, ref: 'Timeblock' }],
  times: [Number],
}, {
  toObject: { virtuals: true },
  toJSON: { virtuals: true },
  timestamps: true,
});

// create model class
const AssignmentModel = mongoose.model('Assignment', AssignmentSchema);

export default AssignmentModel;
