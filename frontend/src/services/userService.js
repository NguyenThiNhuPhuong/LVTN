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

export const removeUser = async (id) => {
  try {
    const res = await httpRequest.post(`user/delete`, { id });
    return res;
  } catch (error) {
    console.log(error);
  }
};

export const editUser = async (id, name, active) => {
  try {
    const res = await httpRequest.post(`user/update`, { id, name, active });
    return res;
  } catch (error) {
    console.log(error);
  }
};
//GET USER PROFILE
export const getAUser = async () => {
  try {
    const res = await httpRequest.get(`auth/user-profile`);
    return res.data;
  } catch (error) {
    console.log(error);
  }
};
