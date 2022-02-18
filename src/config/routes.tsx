import React from "react";
import { BrowserRouter, Switch, Route, Link, Redirect, MemoryRouter } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

import { Home } from "../pages/Home";
import { Login } from "../pages/Login";
import { Register } from "../pages/Register";

export const AppRoutesSwitcher = () => {
    const auth = useAuth();

    return (
        <Switch>
            <Route path="/" exact>
                {auth.user ? <Home /> : <Redirect to="/login" />}
            </Route>
            <Route path="/login" exact>
                <Login />
            </Route>
            <Route path="/register" exact>
                <Register />
            </Route>
        </Switch>
    );
};

export default function AppRouter() {
    return (
        <BrowserRouter>
            <AppRoutesSwitcher />
        </BrowserRouter>
    );
}
