import { UserRegister } from "../../../../types/UserRegister";
import { userMock } from "../User/UserMock";

export const registerMock: UserRegister = {
    ...userMock,
    password: "1234",
};
