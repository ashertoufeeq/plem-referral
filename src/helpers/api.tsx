import { jwtDecode } from "jwt-decode";
import axios, { AxiosHeaders } from "axios";

import { ACCESS_TOKEN, REFRESH_TOKEN } from "constants/storage";
import { DEFAULT_BASE_URL } from "constants/environment";

const instance = axios.create()

instance.defaults.baseURL = DEFAULT_BASE_URL;
instance.defaults.headers.common = {
  token: '',
}


export const getAccessToken = async () => {
  const accessToken = localStorage.getItem(ACCESS_TOKEN);
  const refreshToken = localStorage.getItem(REFRESH_TOKEN);
  if (!(accessToken && refreshToken)) throw Error("No user found");

  const accessPayload = jwtDecode(accessToken);
  if (
    new Date(parseInt(String(accessPayload.exp || "0"), 10) * 1000) > new Date()
  )
    return accessToken;

  const {
    data: { access: newAccessToken },
  } = await axios.post("/api/token/refresh/", {
    refresh: refreshToken,
  });

  localStorage.setItem(ACCESS_TOKEN, newAccessToken);

  return newAccessToken;
};

export const loadAPI = async (url: string, opts: Record<string, any> = {}) => {
  const {
    onSuccess = (data: any) => data,
    onFailure = (error: any) => error,
    secure = true,
    headers,
    ...options
  } = opts;

  const token = secure?await getAccessToken():'';
  const defaultHeaders = new AxiosHeaders({
    token // just a case preset
  });

  defaultHeaders.concat(headers)
  
  try {
    instance.defaults.headers.common = defaultHeaders;
    const res = await instance(url, {
      headers: {
        ...(secure
          ? { "token": token }
          : {}),
        ...headers,
      },
      method: "GET",
      ...options,
    });

    const { data, status } = res;
    await onSuccess(data);
    return { data, status, error: undefined, loading: false };
  } catch (error: any) {
    console.log("error",error);
    if (error.response) {
      const { data, status } = error.response;
      if (status === 401) {
        // reloadFunc();
        // reloadFunc();
        // await storage.delete(ACCESS_TOKEN);
        // await storage.delete(REFRESH_TOKEN);
        // await navigate('/');
        // window.location.reload('/');
      }
      await onFailure(data);
      return { data: undefined, status, error: data, loading: false };
    }

    if (error.request) {
      console.log("error");
      const e = { message: "error in request setup" };
      // noinspection JSCheckFunctionSignatures
      return { data: undefined, status: 0, error: e, loading: false };
    }

    throw Error(error);
  }
};
