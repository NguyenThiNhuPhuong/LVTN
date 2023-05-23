import Swal from "sweetalert2";
import * as httpRequest from "~/httpRequest/httpRequest";

export const getListSlider = async ({ active }) => {
  try {
    let params = "";
    if (active !== undefined) {
      params += `active=${active}`;
    }
    const res = await httpRequest.get(`sliders?` + params);
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

export const updateSlider = async ({ id, data }) => {
  try {
    const res = await httpRequest.postFormData(
      `sliders/${id}?_method=put`,
      data
    );
    return res;
  } catch (error) {
    console.log(error);
  }
};
export const getASlider = async (id) => {
  try {
    const res = await httpRequest.get(`sliders/${id}`);
    return res;
  } catch (error) {
    console.log(error);
  }
};
