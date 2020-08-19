import mongoose, { Schema } from 'mongoose';

const UserSchema = new Schema({
  name: String,
  gid: String,
  classes: [String],
},
{
  toObject: { virtuals: true },
  toJSON: { virtuals: true },
  timestamps: true,
});

// create model class
const UserModel = mongoose.model('User', UserSchema);

export default UserModel;
