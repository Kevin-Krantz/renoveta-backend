import { IUser } from "types/IUser";
import Joi from "joi";
import jwt from "jsonwebtoken";
import mongoose, { Schema, Model } from "mongoose";
import "mongoose-type-email";

const userSchema: Schema<IUser> = new mongoose.Schema({
  name: { type: String, minlength: 2, required: true },
  // @ts-ignore
  email: { type: mongoose.SchemaTypes.Email, required: true },
  password: { type: String, minlength: 6, required: true },
  isAdmin: Boolean,
});

userSchema.methods.generateAuthToken = function () {
  return jwt.sign(
    {
      _id: this._id,
      name: this.name,
      email: this.email,
      isAdmin: this.isAdmin,
    },
    "jwtPrivateKey"
  );
};

const User: Model<IUser> = mongoose.model("User", userSchema);

const validateUser = (user: IUser) => {
  const schema = Joi.object({
    name: Joi.string().min(2).required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required(),
  });

  return schema.validate(user);
};

export { validateUser, User };
