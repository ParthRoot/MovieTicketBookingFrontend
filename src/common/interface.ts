export interface ISignUpForm {
  first_name: string;
  last_name: string;
  password: string;
  email: string;
  mobile_no: string;
  avatar?: string;
}

export interface ILogin {
  email: string;
  password: string;
}
