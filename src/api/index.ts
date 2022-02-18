import axios from "axios";
import { Login } from "../types/Login";
import { User } from "../types/User";
import { UserRegister } from "../types/UserRegister";

export const api = axios.create({ baseURL: "http://localhost:8080" });

export function login({ email, password }: Login) {
    return api.get<User[]>("/users", {
        params: {
            email,
            password,
            _limit: 1,
        },
    });
}

export function register(user: UserRegister) {
    return api.post("/users", user);
}
