import { IUser } from "types/IUser";
import Joi from "joi";
import mongoose from "mongoose";
import "mongoose-type-email";

const userSchema = new mongoose.Schema<IUser>({
  email: { type: String, required: true },
  password: { type: String, minlength: 5, required: true },
});

const User = mongoose.model("User", userSchema);

const validateUser = (user: IUser) => {
  const schema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(5).required(),
  });

  return schema.validate(user);
};

export default validateUser;
User;
