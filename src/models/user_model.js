import mongoose, { Schema } from 'mongoose';

const UserSchema = new Schema({
  name: String,
  assignments: [{ type: Schema.Types.ObjectId, ref: 'Assignment' }],
  calendar_link: String,
},
{
  toObject: { virtuals: true },
  toJSON: { virtuals: true },
  timestamps: true,
});

// create model class
const UserModel = mongoose.model('User', UserSchema);

export default UserModel;
