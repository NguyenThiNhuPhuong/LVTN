import Swal from "sweetalert2";
import * as httpRequest from "~/httpRequest/httpRequest";
//LIST CATEGORY
export const getListCategory = async ({ active }) => {
  try {
    let params = "";
    if (active !== undefined) {
      params += `active=${active}`;
    }
    const res = await httpRequest.get(`categories?` + params);
    return res;
  } catch (error) {
    console.log(error);
  }
};
//DETELE CATEGORY
export const removeCategory = async (id) => {
  try {
    const res = await httpRequest.remove(`categories/${id}`);
    return res;
  } catch (error) {
    Swal.fire(`${error.response.data.message}😥`);
  }
};
//CREATE CATEGORY
export const newCategory = async ({ name, description }) => {
  try {
    const res = await httpRequest.post(`categories`, { name, description });
    return res;
  } catch (error) {
    Swal.fire(`${error.response.data.message}😥`);
  }
};
//UPDATE CATEGORY
export const updateCategory = async ({ id, name, description, active }) => {
  try {
    const res = await httpRequest.put(`categories/${id}`, {
      name,
      description,
      active,
    });
    return res;
  } catch (error) {
    Swal.fire(`${error.response.data.message}😥`);
  }
};
//GET A CATEGORY
export const getACategory = async (id) => {
  try {
    const res = await httpRequest.get(`categories/${id}`);
    return res;
  } catch (error) {
    console.log(error);
  }
};
