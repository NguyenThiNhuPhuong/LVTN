import axios from "axios";
import Cookies from "js-cookie";
const httpRequestFormData = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL,
  headers: {
    "Content-Type": "multipart/form-data",
  },
});
httpRequestFormData.interceptors.request.use(
  (config) => {
    const token = Cookies.get("token");
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    } else {
      delete config.headers["Authorization"];
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
const httpRequest = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});
httpRequest.interceptors.request.use(
  (config) => {
    const token = Cookies.get("token");
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

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
