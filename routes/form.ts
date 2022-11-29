import express from "express";
import Joi from "joi";
import admin from "middleware/admin";
import { User } from "models/User";
import auth from "../middleware/auth";
import { validateForm as validate, RenovetaForm } from "../models/Form";

const router = express.Router();

router.get("/", auth, async (req: any, res) => {
  // bara auth
  // typa upp req
  const forms = await RenovetaForm.find({ user: req.user });

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

router.post("/", async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.message);

  let form: any = new RenovetaForm({
    user: req.body.userId,
    renovationType: req.body.renovationType,
    typeOfRoof: req.body.typeOfRoof,
    roofMaterial: req.body.roofMaterial,
    roofAngle: req.body.roofAngle,
    propertyWidth:  req.body.propertyWidth,
    propertyLength:  req.body.propertyLength,
    questions: req.body.questions,
   /* extraRenovationRequirements: req.body.extraRenovationRequirements,*/
    userInfo: req.body.userInfo,
  });

  form = await form.save();
  return res.status(201).send(form);
});

router.put("/:id", [auth, admin], async (req: any, res: any) => {
  const schema = Joi.object({ adminResponse: Joi.string() });
  const { error } = schema.validate(req.body);

  if (error) return res.status(400).send(error.message);

  const form = await RenovetaForm.findById(req.params.id);
  if (!form)
    return res.status(404).send("The user with the given id was not found.");

  // gör uppdateringen
  form.adminResponse = req.body.adminResponse;

  await form.save();

  return res.send(form);
});

export default router;
