import mongoose, { Schema } from 'mongoose';
// populated from each calendar link
const TimeblockSchema = new Schema({
  eventID: String,
  user: String,
  Start: Date,
  End: Date,
}, {
  toObject: { virtuals: true },
  toJSON: { virtuals: true },
  timestamps: true,
});

// create model class
const TimeblockModel = mongoose.model('Timeblock', TimeblockSchema);

export default TimeblockModel;
