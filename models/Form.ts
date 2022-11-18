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

  renovationType: {
    type: [{ type: String, enum: renovationtypes, required: true }],
    required: true,
  },

  extraRenovationRequirements: { type: String },

  typeOfRoof: {
    // Kolla om man får skicka in flera typer av tak
    type: [{ type: String, enum: rooftypes, required: true }],
    required: true,
  },

  roofMaterial: {
    // Kolla om man får skicka in flera olika tak material
    type: [{ type: String, enum: roofmaterialtypes, required: true }],
    required: true,
  },

  roofAngle: { type: Number, required: true },

  houseMeasurements: {
    type: Object as () => HouseMeasurements,
    required: true,
  },

  questions: { type: String },

  fileUpload: { type: String }, // måste kunna ladda upp på något sätt

  userInfo: {
    type: Object as () => UserInfo,
    required: true,
  },

  dateIssued: { type: Date, default: Date.now() },
});

const RenovetaForm: Model<IForm> = mongoose.model(
  "RenovetaForm",
  formRenovationSchema
);

function validateForm(formSchema: IForm) {
  const schema = Joi.object<IForm>({
    // @ts-ignore
    userId: Joi.string().required(),

    renovationType: Joi.array()
      .items(
        Joi.string()
          .valid(...renovationtypes)
          .required()
      )
      .required(),
    extraRenovationRequirements: Joi.string(),
    typeOfRoof: Joi.array()
      .items(
        Joi.string()
          .valid(...rooftypes)
          .required()
      )
      .required(),
    roofMaterial: Joi.array()
      .items(
        Joi.string()
          .valid(...roofmaterialtypes)
          .required()
      )
      .required(),
    roofAngle: Joi.number().required(),
    houseMeasurements: Joi.object<HouseMeasurements>()
      .required()
      .strict()
      .keys({
        length: Joi.number().required(),
        width: Joi.number().required(),
      }),
    questions: Joi.string(),
    fileUpload: Joi.string(),
    userInfo: Joi.object<UserInfo>()
      .required()
      .strict()
      .keys({
        email: Joi.string().email().required(),
        name: Joi.string().required(),
        lastName: Joi.string().required(),
        residence: Joi.object<Residence>().required().keys({
          streetAdressAndNumber: Joi.string().required(),
          propertyDesignation: Joi.string().required(),
          city: Joi.string().required(),
        }),
      }),
  });
  return schema.validate(formSchema);
}

export { validateForm, RenovetaForm };
