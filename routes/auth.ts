import express from "express";
import Joi from "joi";
import bcrypt from "bcrypt";
import { IUser } from "types/IUser";
import { User } from "../models/User";
const router = express.Router();

router.post("/", async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.message);

  const user = await User.findOne({ email: req.body.email });
  if (!user) return res.status(400).send("Invalid email or password");

  const isValid = await bcrypt.compare(req.body.password, user.password);
  if (!isValid) return res.status(400).send("Invalid email or password");

  const token = user.generateAuthToken();

  return res.send(token);
});

const validate = (user: IUser) => {
  const schema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(5).required(),
  });

  return schema.validate(user);
};

export default router;
