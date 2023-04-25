// import * as httpRequest from "../httpRequest";

import httpRequest from "~/httpRequest/httpRequest";

export const getUser = async (page) => {
  try {
    const res = await httpRequest.get(`user?pageIndex=${page}`);

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
export const getAUser = async (id) => {
  try {
    const res = await httpRequest.get(`auth/user-profile`);
    return res.data;
  } catch (error) {
    console.log(error);
  }
};
