import axiosDefault from "axios";
import Swal from "sweetalert2";
import httpRequest from "~/httpRequest/httpRequest";

export const apiGetPublicProvinces = async () => {
  try {
    const res = await httpRequest.post(`/address/provinces`);
    return res;
  } catch (error) {
    Swal.fire(`${error.response.data.message}😥`);
  }
};
export const apiGetPublicDistrict = async (provinceId) => {
  try {
    const res = await httpRequest.post(`/address/provinces/${provinceId}`);
    return res;
  } catch (error) {
    Swal.fire(`${error.response.data.message}😥`);
  }
};

export const apiGetPublicWard = async (districtId) => {
  try {
    const res = await httpRequest.post(`/address/provinces/${districtId}`);
    return res;
  } catch (error) {
    Swal.fire(`${error.response.data.message}😥`);
  }
};
