import { render } from "@testing-library/react";
import React, { ReactNode } from "react";
import { BrowserRouter, MemoryRouterProps, RouteProps } from "react-router-dom";
import { AuthProvider } from "../../contexts/AuthContext";
import { ChakraProvider } from "@chakra-ui/react";
import { useLocation, MemoryRouter } from "react-router-dom";

import { AppRoutesSwitcher } from "../../config/routes";
import { userMock } from "../mocks/models/User/UserMock";

export const renderRouterGuest = (routerProps?: MemoryRouterProps) => {
  return render(
    <AuthProvider>
      <MemoryRouter {...routerProps}>
        <AppRoutesSwitcher />
      </MemoryRouter>
    </AuthProvider>
  );
};

export const renderRouterAuth = (routerProps?: MemoryRouterProps) => {
  return render(
    <AuthProvider mockUser={userMock}>
      <MemoryRouter {...routerProps}>
        <AppRoutesSwitcher />
      </MemoryRouter>
    </AuthProvider>
  );
};
