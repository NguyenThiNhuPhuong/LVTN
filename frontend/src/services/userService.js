import Swal from "sweetalert2";
import * as httpRequest from "~/httpRequest/httpRequest";

//GET LIST USER
export const getListUser = async () => {
  try {
    const res = await httpRequest.get(`users`);
    return res;
  } catch (error) {
    console.log(error);
  }
};
//NEW USER
export const newUser = async (newUser) => {
  try {
    const res = await httpRequest.post(`users`, newUser);
    return res;
  } catch (error) {
    Swal.fire(`${error.response.data.message}😥`);
  }
};
//GET A USER
export const getAUser = async (id) => {
  try {
    const res = await httpRequest.get(`users/${id}`);
    return res;
  } catch (error) {
    console.log(error);
  }
};
//UPDATE USER
export const updateUser = async ({ data, id }) => {
  try {
    const res = await httpRequest.postFormData(`users/${id}`, data);
    return res;
  } catch (error) {
    Swal.fire(`${error.response.data.message}😥`);
  }
};
//GET USER PROFILE
export const getUserProfile = async () => {
  try {
    const res = await httpRequest.get(`auth/user-profile`);
    return res;
  } catch (error) {
    console.log(error);
  }
};
