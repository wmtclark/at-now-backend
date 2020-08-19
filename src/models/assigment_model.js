import mongoose, { Schema } from 'mongoose';
// populated from each calendar link
const AssigmentSchema = new Schema({
  type: String,
  params: Schema.Types.Mixed,
  dtstamp: Date,
  uid: String,
  start: Date,
  datetype: String,
  end: Date,
  class: String,
  description: String,
  sequence: String,
  summary: String, // this has format "some words [class ID]"
  url: String,
  val: String,
  timeblocks: [{ type: Schema.Types.ObjectId, ref: 'Timeblock' }],
}, {
  toObject: { virtuals: true },
  toJSON: { virtuals: true },
  timestamps: true,
});

// create model class
const AssignmentModel = mongoose.model('Assigment', AssigmentSchema);

export default AssignmentModel;
