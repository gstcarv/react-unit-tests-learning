import { rest } from "msw";
import { baseRest, server } from ".";
import { userMock } from "../models/User/UserMock";

export const handleLoginSuccessMockRequest = () => {
    server.use(rest.get(baseRest("/users"), (req, res, ctx) => res(ctx.json([userMock]))));
};

export const handleLoginErrorMockRequest = () => {
    server.use(rest.get(baseRest("/users"), (req, res, ctx) => res(ctx.status(402))));
};

export const handleRegisterSuccessMockRequest = () => {
    server.use(rest.post(baseRest("/users"), (req, res, ctx) => res(ctx.json(userMock))));
};

export const handleRegisterErrorMockRequest = () => {
    server.use(rest.post(baseRest("/users"), (req, res, ctx) => res(ctx.status(500))));
};
