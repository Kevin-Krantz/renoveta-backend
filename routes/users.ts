import express from "express";
import bcrypt from "bcrypt";
import { validateUser as validate, User } from "../models/User";
import {
  registrationMailForCustomer,
  registrationMailForRenoveta,
} from "../service/nodemail";

const router = express.Router();

router.post("/", async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.message);

  const existingUser = await User.findOne({ email: req.body.email });
  if (existingUser) return res.status(400).send("User already registered.");

  const user = new User(req.body);
  const salt = await bcrypt.genSalt();
  user.password = await bcrypt.hash(user.password, salt);
  user.save();

  const { password, ...userWithoutPassword } = user.toObject();

  const token = user.generateAuthToken();
  // registrationMailForCustomer(req.body.email, req.body.name);
  // registrationMailForRenoveta();

  return res
    .status(201)
    .header("x-auth-token", token)
    .send(userWithoutPassword);
});

export default router;
