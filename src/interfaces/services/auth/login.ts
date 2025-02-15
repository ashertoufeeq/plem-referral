import { loadAPI } from "helpers/api";

interface IRequest {
    email: string;
    password: string
}

export const loginUserService = (credentials: IRequest) => loadAPI('/v1/plembox/external/auth/login', {
    data: credentials,
    secure: false
});
