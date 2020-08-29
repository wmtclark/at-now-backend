import mongoose, { Schema } from 'mongoose';

const UserSchema = new Schema({
  name: String,
  assignments: [{ assignment: { type: Schema.Types.ObjectId, ref: 'Assignment' }, status: String }],
  calendar_link: String,
  gid: String,
  gcal_string: String,
},
{
  toObject: { virtuals: true },
  toJSON: { virtuals: true },
  timestamps: true,
});

// create model class
const UserModel = mongoose.model('User', UserSchema);

export default UserModel;
