// import * as httpRequest from "../httpRequest";

import httpRequest from "~/httpRequest/httpRequest";
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
    console.log(error);
  }
};
//GET A USER
export const getAUser = async (id) => {
  try {
    const res = await httpRequest.get(`users/${id}`);
    return res.data;
  } catch (error) {
    console.log(error);
  }
};
//UPDATE USER
export const updateUser = async (updateUser) => {
  try {
    const res = await httpRequest.post(`user/update`, updateUser);
    return res;
  } catch (error) {
    console.log(error);
  }
};
//GET USER PROFILE
export const getUserProfile = async () => {
  try {
    const res = await httpRequest.get(`auth/user-profile`);
    return res.data;
  } catch (error) {
    console.log(error);
  }
};
