import { IUser } from "types/IUser";
import Joi from "joi";
import mongoose, { Schema, Model } from "mongoose";
import "mongoose-type-email";

const userSchema: Schema<IUser> = new mongoose.Schema({
  firstName: { type: String, minlength: 2, required: true },
  lastName: { type: String, minlength: 2, required: true },
  // @ts-ignore
  email: { type: mongoose.SchemaTypes.Email, required: true },
  password: { type: String, minlength: 5, required: true },
});

const User: Model<IUser> = mongoose.model("User", userSchema);

const validateUser = (user: IUser) => {
  const schema = Joi.object({
    firstName: Joi.string().min(2).required(),
    lastName: Joi.string().min(2).required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(5).required(),
  });

  return schema.validate(user);
};

export { validateUser, User };
