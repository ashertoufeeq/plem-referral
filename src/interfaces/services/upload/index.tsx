import { loadAPI } from "helpers/api";

export const uploadFile = async (body: any) => loadAPI("/b2b/v1/upload/external/",   {
  method: "POST",
  data: body,
  secure: true,
  headers: {
    "Content-Type": "multipart/form-data",
    "Accept": "*/*",
  },
})

//   .catch((err) => {
//     console.log(err)
//     return err.response.data
