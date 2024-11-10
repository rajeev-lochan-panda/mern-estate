import { IErrorState, IUserData } from "../types/user";

export const defaultFormData: IUserData = {
  email: "",
  password: "",
};

export const defaultErrorData: IErrorState = {
  email: "",
  password: "",
  form: "",
};
