import express from "express";
import validate from "../models/User";
const router = express.Router();

router.post("/", (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.message);
});

export default router;
