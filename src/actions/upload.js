import axios from "../utils/axios";

export function uploadFile(credentials, token) {
  return new Promise((resolve, reject) => {
    axios
      .post("/upload-file", credentials, {
          headers: {
            "Access-Control-Allow-Origin" : "*",

            "Authorization": `Bearer ${token}`
            }
        })
      .then((response) => {
        if (response.status === 200) {
          resolve(response.data);
        }
        reject(response.data);
      })
      .catch((error) => {
        reject(error);
      });
  });
}
