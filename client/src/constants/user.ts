import { IErrorState, IFormData } from "../types/user";

export const defaultFormData: IFormData = {
  email: "",
  password: "",
};

export const defaultErrorData: IErrorState = {
  email: "",
  password: "",
  form: "",
};
