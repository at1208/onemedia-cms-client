import openSocket from 'socket.io-client';
import { getCookie } from '../actions/auth';
const token = getCookie("token");
let socket = openSocket(process.env.REACT_APP_SOCKET_SERVER_API,{
  reconnectionDelayMax: 10000,
  auth: {
    token: token
  }
})
export default socket;
