import { RenovationType } from "./RenovationType";
import { RoofMaterial } from "./RoofMaterial";
import { TypeOfRoof } from "./TypeOfRoof";

export interface IForm {
  user: any;
  renovationType: RenovationType[];
  extraRenovationRequirements: string;
  typeOfRoof: TypeOfRoof[];
  roofMaterial: RoofMaterial[];
  roofAngle: number;
  houseMeasurements: HouseMeasurements;
  questions: string;
  fileUpload: string; // måste kunna ladda upp på något sätt
  userInfo: UserInfo;
  dateIssued: Date;
}

export interface HouseMeasurements {
  length: number;
  width: number;
}

export interface UserInfo {
  email: string;
  phone: number;
  name: string;
  lastName: string;
  residence: Residence;
  wantToRegister: boolean;
  signAgreement: boolean;
}

export interface Residence {
  streetAdressAndNumber: string;
  propertyDesignation: string;
  city: string;
}
