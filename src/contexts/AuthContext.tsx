import { useState } from "react";
import { createContext } from "react";
import { Login } from "../types/Login";
import { User } from "../types/User";

import * as UserService from "../api";
import { AxiosResponse } from "axios";

interface AuthProviderProps {
    mockUser?: User;
    children: any;
}

interface AuthContextTypes {
    user: User | null;
    login(credentials: Login): Promise<AxiosResponse<User[]>>;
}

export const AuthContext = createContext<AuthContextTypes>({} as AuthContextTypes);

export const AuthProvider = ({ children, mockUser }: AuthProviderProps) => {
    const [user, setUser] = useState<User | null>(mockUser ?? null);

    async function login(credentials: Login): Promise<AxiosResponse<User[]>> {
        const user = await UserService.login(credentials);
        setUser(user.data[0]);
        return user;
    }

    return <AuthContext.Provider value={{ user, login }}>{children}</AuthContext.Provider>;
};
