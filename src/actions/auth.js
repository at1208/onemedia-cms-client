import axios from "../utils/axios";
import cookie from 'js-cookie';

export function onBoard(credentials) {
  return new Promise((resolve, reject) => {
    axios
      .post(`/onboard/employee/${credentials}`)
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

export function acceptInvitation(credentials) {
  return new Promise((resolve, reject) => {
    axios
      .post("/accept/onboard/invitation", credentials)
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

export function signIn(credentials) {
  return new Promise((resolve, reject) => {
    axios
      .post("/signin", credentials)
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

export const signout = next => {
    removeCookie('token');
    removeLocalStorage('user');
    next();
};


export const setCookie = (key, value) => {
  cookie.set(key, value, {
      expires: 1
  });
};


export const removeCookie = key => {
  cookie.remove(key, {
      expires: 1
  });
};


export const getCookie = key => {
  return cookie.get(key);
};


export const setLocalStorage = (key, value) => {
  localStorage.setItem(key, JSON.stringify(value));
};




export const removeLocalStorage = key => {
        localStorage.removeItem(key);
};


export const authenticate = (data, next) => {
    setCookie('token', data.token);
    setLocalStorage('user', data.employee);
    next();
};


export const isAuth = () => {
  const cookieChecked = getCookie('token');
  if (cookieChecked) {
      if (localStorage.getItem('user')) {
          return JSON.parse(localStorage.getItem('user'));
      } else {
          return false;
      }
  }
};
