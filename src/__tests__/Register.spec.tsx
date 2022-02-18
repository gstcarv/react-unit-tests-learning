import { fireEvent, screen, waitFor, waitForElementToBeRemoved } from "@testing-library/react";
import { registerMock } from "../utils/mocks/models/Register/RegisterMock";
import { userMock } from "../utils/mocks/models/User/UserMock";
import { handleRegisterSuccessMockRequest } from "../utils/mocks/server/user";
import { renderRouterGuest } from "../utils/test/setup";

describe("<Register />", () => {
    const renderRegisterRoutes = () => renderRouterGuest({ initialEntries: ["/register"] });

    const getRegisterFields = () => ({
        nameField: screen.getByTestId("name") as HTMLInputElement,
        emailField: screen.getByTestId("email") as HTMLInputElement,
        passwordField: screen.getByTestId("password") as HTMLInputElement,
    });

    it("should contains user register fields", () => {
        // setup
        renderRegisterRoutes();
        const { nameField, emailField, passwordField } = getRegisterFields();

        // test
        expect(nameField).toBeInTheDocument();
        expect(emailField).toBeInTheDocument();
        expect(passwordField).toBeInTheDocument();
    });

    it("should register user with success and redirect to login", async () => {
        // setup
        renderRegisterRoutes();
        handleRegisterSuccessMockRequest();
        const { emailField, nameField, passwordField } = getRegisterFields();

        // test
        fireEvent.change(nameField, { target: { value: registerMock.name } });
        fireEvent.change(emailField, { target: { value: registerMock.email } });
        fireEvent.change(passwordField, { target: { value: registerMock.password } });

        const registerButton = screen.getByTestId("btn-register");

        fireEvent.click(registerButton);

        expect(registerButton).toBeDisabled();
        expect(registerButton).toHaveAttribute("data-loading");

        await waitForElementToBeRemoved(registerButton);
    });
});
