import { loadAPI } from "helpers/api";

interface IRequest {
    email: string;
    password: string
}

export const loginUserService = (credentials: IRequest) => loadAPI('/v1/auth/b2b/userVerification', {
    data: {...credentials},
    secure: false,
    method: "POST"
});
