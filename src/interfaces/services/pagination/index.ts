import { loadAPI } from "helpers/api";

export const fetchApiData = (url:string) => loadAPI(url, {
    secure: false,
    method: "GET"
});
