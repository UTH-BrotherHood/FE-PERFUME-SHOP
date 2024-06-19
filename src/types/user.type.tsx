export interface IUser extends Document {
    name: string;
    email: string;
    password: string;
    isAdmin: boolean;
    phone?: number;
    address?: string;
    avatar?: string;
    city?: string;
}
export interface UserRegisterPayloadType {
    // Define the structure of your data object
    name: string;
    email: string;
    password: string;
    confirm_password: string;
    date_of_birth: string | Date;

    // Add other properties if needed
}
export interface UserLoginPayloadType {
    // Define the structure of your data object
    email: string;
    password: string;
    // Add other properties if needed
}

export interface ResetPasswordPayloadType {
    // Define the structure of your data object
    token: string | undefined;
    password: string;
    // Add other properties if needed
}