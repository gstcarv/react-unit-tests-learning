import { User } from "./User";

export interface UserRegister extends Omit<User, "id"> {
    password: string;
}
