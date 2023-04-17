import axios from "axios";
import Cookies from "js-cookie";

const httpRequest = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL,
  headers: {
    "Content-Type": "application/json",
    Authorization: Cookies.get("token") ? "Bearer " + Cookies.get("token") : "",
  },
});
console.log(Cookies.get("token"));
export const get = async (path, options = {}) => {
  const response = await httpRequest.get(path, options);
  return response.data;
};
export const post = async (path, options = {}) => {
  const response = await httpRequest.post(path, options);
  return response;
};
export const put = async (path, options = {}) => {
  const response = await httpRequest.put(path, options);
  return response;
};
export const remove = async (path, options = {}) => {
  const response = await httpRequest.delete(path, options);
  return response;
};
export default httpRequest;
