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


const formRenovationSchema = new Schema<IForm>({
  user: { type: mongoose.SchemaTypes.ObjectId, ref: "User", required: true },

  renovationType: {
    type: String,
    required: true,
  },

  /*extraRenovationRequirements: { type: String },*/

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

  roofAngle: { type: String},
  
  propertyWidth: { type: String, required: true },
  propertyLength: { type: String, required: true },


  questions: { type: String },

  fileUpload: { type: String }, // måste kunna ladda upp på något sätt

  userInfo: {
    type: Object as () => UserInfo,
    
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

    renovationType:  Joi.string(),
   /*
    extraRenovationRequirements: Joi.string(),
    */
    typeOfRoof: Joi.string(),
    roofMaterial:  Joi.string(),

    roofAngle: Joi.string(),
    propertyWidth: Joi.string(),
    propertyLength: Joi.string(),
    questions: Joi.string(),
    fileUpload: Joi.string(),
    userInfo: Joi.object<UserInfo>()
      .required()
      .strict()
      .keys({
        email: Joi.string().email().required(),
        phone: Joi.string().required(),
        name: Joi.string().required(),
        password: Joi.string().min(6).required(),
        residence: Joi.object<Residence>().required().keys({
          streetAdressAndNumber: Joi.string().required(),
          propertyDesignation: Joi.string().required(),
          city: Joi.string().required(),
        }),
      }),
    adminResponse: Joi.string(),
  });
  return schema.validate(formSchema);
}

export { validateForm, RenovetaForm };
