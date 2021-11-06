import axios from "axios";

export default axios.create({
  baseURL:process.env.REACT_APP_SERVER_API,
  validateStatus: (status) => status < 500,
});
