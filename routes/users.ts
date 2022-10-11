import express from "express";
import { validateUser as validate, User } from "../models/User";
const router = express.Router();

router.post("/", (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.message);
});

export default router;
