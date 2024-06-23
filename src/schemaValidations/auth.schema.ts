export type RegisterBodyType = {
  name: string
  email: string
  password: string
  confirm_password: string
  date_of_birth: string
};

export type SignInBodyType = {
    email: string;
    password: string;
};
