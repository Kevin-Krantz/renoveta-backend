import express from "express";
import admin from "middleware/admin";
import { User } from "models/User";
import auth from "../middleware/auth";
import { validateForm as validate, RenovetaForm } from "../models/Form";

const router = express.Router();

router.get("/", auth, async (req: any, res) => {
  // bara auth
  // typa upp req
  const forms = await RenovetaForm.find({ user: req.user });
  console.log(req.user);

  return res.send(forms);
});

router.get("/all", [auth, admin], async (req: any, res: any) => {
  // auth och admin

  const forms = await RenovetaForm.find();
  return res.send(forms);
});

router.get("/:id", auth, async (req, res) => {
  // bara auth
  const form: any = await RenovetaForm.findById(req.params.id);

  if (!form)
    return res.status(404).send("The form with the given id was not found");

  return res.send(form);
});

router.post("/", auth, async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.message);

  const user = await User.findById(req.body.userId);
  if (!user)
    return res.status(404).send("The user with the given id was not found.");

  let form: any = new RenovetaForm({
    user: req.body.userId,
    renovationType: req.body.renovationType,
    typeOfRoof: req.body.typeOfRoof,
    roofMaterial: req.body.roofMaterial,
    roofAngle: req.body.roofAngle,
    houseMeasurements: req.body.houseMeasurements,
    questions: req.body.questions,
    extraRenovationRequirements: req.body.extraRenovationRequirements,
    userInfo: req.body.userInfo,
  });

  form = await form.save();
  return res.status(201).send(form);
});

export default router;
