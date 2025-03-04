import { loadAPI } from "helpers/api";


export const fetchApiData = async (url:string) => loadAPI(url, {
  sercure: true
})
