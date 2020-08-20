import mongoose, { Schema } from 'mongoose';

const UserSchema = new Schema({
  name: String,
  assignments: [Schema.Types.ObjectId],
  calendar_link: String,
  gid: String,
},
{
  toObject: { virtuals: true },
  toJSON: { virtuals: true },
  timestamps: true,
});

// create model class
const UserModel = mongoose.model('User', UserSchema);

export default UserModel;
