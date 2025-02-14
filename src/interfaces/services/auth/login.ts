import axios from "axios";

interface IRequest {
    email: string;
    password: string
}

export const loginUserService = async (credentials: IRequest) => await axios.post('/v1/plembox/external/auth/login', credentials);

//http://localhost:9092