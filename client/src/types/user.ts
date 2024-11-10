// export interface IFormData {
//   email: string;
//   password: string;
//   avatar?: string;
// }

export interface IErrorState {
  email: string;
  password: string;
  form: string;
}


export interface IUserData {
  username?: string;
  email: string;
  password: string;
  avatar?: string;
}

export interface IResponse {
  success: boolean;
  message: string;
  data: IUserData;
}
