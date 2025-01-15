import { Schema, model } from 'mongoose';

import { REGEXP_EMAIL } from '../../constans/index.js';

const usersSchema = new Schema(
  {
    name: { type: String, required: true },
    email: {
      type: String,
      match: REGEXP_EMAIL,
      unique: true,
      required: true,
    },
    password: { type: String, required: true },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

usersSchema.methods.toJSON = function () {
  const obj = this.toObject();
  delete obj.password;
  return obj;
};

const UserCollection = model('user', usersSchema);
export default UserCollection;