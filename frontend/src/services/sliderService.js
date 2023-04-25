import Swal from "sweetalert2";
import * as httpRequest from "~/httpRequest/httpRequest";

export const getListSlider = async () => {
  try {
    const res = await httpRequest.get(`sliders`);
    return res;
  } catch (error) {
    console.log(error);
  }
};
export const removeSlider = async (id) => {
  try {
    const res = await httpRequest.remove(`sliders/${id}`);
    return res;
  } catch (error) {
    console.log(error);
  }
};
export const newSlider = async (newSlider) => {
  try {
    const res = await httpRequest.postFormData(`sliders`, newSlider);
    return res;
  } catch (error) {
    Swal.fire(`${error.response.data.message}😥`);
  }
};

export const updateSlider = async (values, id) => {
  try {
    const res = await httpRequest.postFormData(`slider/${id}`, values);
    return res;
  } catch (error) {
    console.log(error);
  }
};
export const getASlider = async (id) => {
  try {
    const res = await httpRequest.get(`sliders/${id}`);
    return res.data;
  } catch (error) {
    console.log(error);
  }
};
