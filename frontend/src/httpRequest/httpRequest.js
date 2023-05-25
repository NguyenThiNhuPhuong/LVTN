import axios from "axios";
import Cookies from "js-cookie";
const httpRequestFormData = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL,
  headers: {
    "Content-Type": "multipart/form-data",
    Authorization: Cookies.get("token") ? "Bearer " + Cookies.get("token") : "",
  },
});
const httpRequest = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL,
  headers: {
    "Content-Type": "application/json",
    Authorization: Cookies.get("token") ? "Bearer " + Cookies.get("token") : "",
  },
});

export const postFormData = async (path, options) => {
  const response = await httpRequestFormData.post(path, options);
  return response;
};

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
