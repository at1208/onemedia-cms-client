import axios from "../utils/axios";


export function createEmployee(credentials, token) {
  return new Promise((resolve, reject) => {
    axios
      .post("/create/employee/employee/write", credentials,{
          headers: {
            "Access-Control-Allow-Origin" : "*",
            "Content-type": "Application/json",
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

export function getEmployee(token) {
  return new Promise((resolve, reject) => {
    axios
      .get("/all/employees/employee/read", {
          headers: {
            "Access-Control-Allow-Origin" : "*",
            "Content-type": "Application/json",
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

export function getChatEmployee(token) {
  return new Promise((resolve, reject) => {
    axios
      .get("/all/employees/chat/read", {
          headers: {
            "Access-Control-Allow-Origin" : "*",
            "Content-type": "Application/json",
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

export function getSingleEmployee(credentials, token) {
  return new Promise((resolve, reject) => {
    axios
      .get(`/single/employees/${credentials}/employee/read`, {
          headers: {
            "Access-Control-Allow-Origin" : "*",
            "Content-type": "Application/json",
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

export function getProfileDetails(credentials, token) {
  return new Promise((resolve, reject) => {
    axios
      .get(`/single/employees/${credentials}/my_profile/read`, {
          headers: {
            "Access-Control-Allow-Origin" : "*",
            "Content-type": "Application/json",
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

export function filterEmployee(credentials, token) {
  return new Promise((resolve, reject) => {
    axios
      .post("/filter/employees/employee/read", credentials, {
          headers: {
            "Access-Control-Allow-Origin" : "*",
            "Content-type": "Application/json",
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



export function updateEmployee(id, credentials, token) {
  return new Promise((resolve, reject) => {
    axios
      .patch(`/update/employee/${id}/employee/update`, credentials, {
          headers: {
            "Access-Control-Allow-Origin" : "*",
            "Content-type": "Application/json",
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

export function updateProfilePicture(credentials, token, id) {
  return new Promise((resolve, reject) => {
    axios
      .patch(`/update/profile-picture/${id}/my_profile/update`, credentials, {
          headers: {
            "Access-Control-Allow-Origin" : "*",
            "Content-type": "Application/json",
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


export function checkModulePermission(moduleType, permission, token) {
  return new Promise((resolve, reject) => {
    axios
      .get(`/module/permission/${moduleType}/${permission}`, {
          headers: {
            "Access-Control-Allow-Origin" : "*",
            "Content-type": "Application/json",
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

export function forgotPassword(credentials) {
  return new Promise((resolve, reject) => {
    axios
      .post("/forgot/password", credentials)
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

export function resetPassword(credentials) {
  return new Promise((resolve, reject) => {
    axios
      .post("/reset/password", credentials)
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
