import Swal from "sweetalert2";
import * as httpRequest from "~/httpRequest/httpRequest";
//LIST CATEGORY
export const getListCategory = async () => {
  try {
    const res = await httpRequest.get(`categories`);
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
    console.log(error);
  }
};
export const newCategory = async ({ name, description }) => {
  try {
    const res = await httpRequest.post(`categories`, { name, description });
    return res;
  } catch (error) {
    Swal.fire(`${error.response.data.message}😥`);
  }
};
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
export const getACategory = async (id) => {
  try {
    const res = await httpRequest.get(`categories/${id}`);
    return res;
  } catch (error) {
    console.log(error);
  }
};
