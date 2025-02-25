import { loadAPI } from "helpers/api";

interface IRequest {
    email: string;
    password: string
}

export const loginUserService = (credentials: IRequest) => loadAPI('/v1/auth/partner-login', {
    data: {...credentials, permissionType: 'can_access_plem_box_admin_portal'},
    secure: false,
    method: "POST"
});
