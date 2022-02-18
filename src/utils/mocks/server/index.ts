import { rest } from "msw";
import { setupServer } from "msw/node";
import { api } from "../../../api";

const server = setupServer();

export const baseRest = (path: string) => {
    return `${api.defaults.baseURL}${path}`;
};

export { server };
