import { fireEvent, waitFor, screen } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import { renderRouterGuest } from "../utils/test/setup";

import "../utils/test/server-setup";

import { loginMock } from "../utils/mocks/models/Login/LoginMock";
import { handleLoginErrorMockRequest, handleLoginSuccessMockRequest } from "../utils/mocks/server/user";
import { userMock } from "../utils/mocks/models/User/UserMock";

describe("<Login />", () => {
    const renderLoginRoutes = () => {
        renderRouterGuest({ initialEntries: ["/login"] });
    };

    const getLoginFields = () => {
        return {
            emailField: screen.getByTestId("email") as HTMLInputElement,
            passwordField: screen.getByTestId("password") as HTMLInputElement,
            loginButton: screen.getByTestId("btn-login") as HTMLButtonElement,
        };
    };

    it("should contain email, password and login button", async () => {
        // setup
        renderLoginRoutes();
        const loginFields = getLoginFields();

        // test
        expect(loginFields.emailField).toBeInTheDocument();
        expect(loginFields.passwordField).toBeInTheDocument();
        expect(loginFields.loginButton).toBeInTheDocument();
    });

    it("should insert values on email and password", async () => {
        // setup
        renderLoginRoutes();
        const { emailField, passwordField } = getLoginFields();

        // test
        fireEvent.change(emailField, { target: { value: loginMock.email } });
        fireEvent.change(passwordField, { target: { value: loginMock.password } });

        expect(emailField.value).toBe(loginMock.email);
        expect(passwordField.value).toBe(loginMock.password);
    });

    it("should authenticate user and send to home", async () => {
        // setup
        renderLoginRoutes();
        handleLoginSuccessMockRequest();
        const { emailField, passwordField, loginButton } = getLoginFields();

        // test
        fireEvent.change(emailField, { target: { value: loginMock.email } });
        fireEvent.change(passwordField, { target: { value: loginMock.password } });

        fireEvent.click(loginButton);

        expect(loginButton).toBeDisabled();
        expect(loginButton).toHaveAttribute("data-loading");

        await waitFor(() => screen.getByTestId("logged-username"));

        const usernameLabel = screen.getByTestId("logged-username");

        expect(usernameLabel).toBeInTheDocument();
        expect(usernameLabel.textContent).toContain(userMock.name);
    });

    it("should show error alert on request error", async () => {
        // setup
        renderLoginRoutes();
        handleLoginErrorMockRequest();
        const { emailField, passwordField, loginButton } = getLoginFields();

        // test
        fireEvent.change(emailField, { target: { value: loginMock.email } });
        fireEvent.change(passwordField, { target: { value: loginMock.password } });

        fireEvent.click(loginButton);

        expect(loginButton).toBeDisabled();
        expect(loginButton).toHaveAttribute("data-loading");

        await waitFor(() => screen.getByTestId("login-error-alert"));

        expect(screen.getByTestId("login-error-alert")).toBeInTheDocument();
    });
});
