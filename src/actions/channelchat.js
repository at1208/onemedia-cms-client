import axios from "../utils/axios";

export function getChannelChats(channelId, credentials, token) {
  return new Promise((resolve, reject) => {
    axios
      .post(`/get/channelchats/${channelId}/channel/read`, credentials, {
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

export function readChannelChats(chatId, userId, token) {
  return new Promise((resolve, reject) => {
    axios
      .get(`channelchat/read/${chatId}/${userId}/channel/read`, {
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
