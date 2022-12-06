import { RenovationType } from "./RenovationType";
import { RoofMaterial } from "./RoofMaterial";
import { TypeOfRoof } from "./TypeOfRoof";
/*
export interface IForm {
  user: any;
  renovationType: string;
  extraRenovationRequirements: string;
  typeOfRoof: string;
  roofMaterial: string;
  roofAngle: string;
  questions: string;
  fileUpload: string;
  propertyWidth: string,
  propertyLength: string,
  userInfo: UserInfo;
  adminResponse: string;
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
  password: string;
  residence: Residence;
  wantToRegister: boolean;
  signAgreement: boolean;
}

export interface Residence {
  streetAdressAndNumber: string;
  propertyDesignation: string;
  city: string;
}*/
export interface IForm {
  renovationType: string;
  changeApperance: string;
  typeOfRoof: string;
  roofMaterial: string;
  roofAngle: string;
  propertyWidth: string;
  propertyLength: string;
  questions: string;
  addImg: string;
  email: string;
  phone: string;
  userId: string;
  name: string;
  password: string;
  address: string;
  propertyName: string;
  city: string;
  };