import express from "express";
import { User } from "models/User";
import { validateForm as validate, RenovetaForm } from "../models/Form";
const router = express.Router();

router.get("/", async (req, res) => {
  const forms = await RenovetaForm.find();
  return res.send(forms);
});

router.post("/", async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.message);

  const user = await User.findById(req.body.userId);
  console.log("Dabody", req.body);
  if (!user)
    return res.status(404).send("The user with the given id was not found.");

  let form: any = new RenovetaForm({
    user,
    renovationType: req.body.renovationType,
    typeOfRoof: req.body.typeOfRoof,
    roofMaterial: req.body.roofMaterial,
    roofAngle: req.body.roofAngle,
    houseMeasurements: req.body.houseMeasurements,
    userInfo: req.body.userInfo,
  });

  form = await form.save();
  return res.status(201).send(form);
});

export default router;
