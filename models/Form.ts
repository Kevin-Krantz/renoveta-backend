import {
  IForm,
  TypeOfRoof,
  RenovationType,
  RoofMaterial,
  HouseMeasurements,
  UserInfo,
  Residence,
} from "types";
import mongoose, { Schema, Model } from "mongoose";
import Joi from "joi";

const renovationtypes = Object.values<RenovationType>(RenovationType);
const rooftypes = Object.values<TypeOfRoof>(TypeOfRoof);
const roofmaterialtypes = Object.values<RoofMaterial>(RoofMaterial);

const formRenovationSchema = new Schema<IForm>({
  user: { type: mongoose.SchemaTypes.ObjectId, ref: "User", required: true },

  renovationType: { type: String, required: true },

  extraRenovationRequirements: { type: String },

  typeOfRoof: {
    // Kolla om man får skicka in flera typer av tak
    type: String,
    required: true,
  },

  roofMaterial: {
    // Kolla om man får skicka in flera olika tak material
    type: String,
    required: true,
  },

  roofAngle: { type: String, required: true },

  houseMeasurements: {
    type: Object as () => HouseMeasurements,
    required: true,
  },

  questions: { type: String },


  userInfo: {
    type: Object as () => UserInfo,
    required: true,
  },

  adminResponse: { type: String },

  dateIssued: { type: Date, default: Date.now() },
});

const RenovetaForm: Model<IForm> = mongoose.model(
  "RenovetaForm",
  formRenovationSchema
);

function validateForm(formSchema: IForm) {
  const schema = Joi.object<IForm>({
    // @ts-ignore
    userId: Joi.string(),
    renovationType: Joi.string().required(),
    extraRenovationRequirements: Joi.string(),
    typeOfRoof: Joi.string().required(),
    roofMaterial: Joi.string().required(),
    roofAngle: Joi.number().required(),
    houseMeasurements: Joi.object<HouseMeasurements>()
      .required()
      .strict()
      .keys({
        length: Joi.number().required(),
        width: Joi.number().required(),
      }),
    questions: Joi.string(),
    userInfo: Joi.object<UserInfo>()
      .required()
      .strict()
      .keys({
        email: Joi.string().email().required(),
        phone: Joi.number().required(),
        name: Joi.string().required(),
        password: Joi.string().min(6).required(),
        residence: Joi.object<Residence>().required().keys({
          streetAdressAndNumber: Joi.string().required(),
          propertyDesignation: Joi.string().required(),
          city: Joi.string().required(),
        }),
      }),
    adminResponse: Joi.string(),
    dateIssued: Joi.date(),
  });
  return schema.validate(formSchema);
}

export { validateForm, RenovetaForm };
