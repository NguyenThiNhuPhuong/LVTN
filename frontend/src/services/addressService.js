import Swal from "sweetalert2";
import httpRequest from "~/httpRequest/httpRequest";

export const apiGetPublicProvinces = async () => {
  try {
    const res = await httpRequest.get(`address/provinces`);
    return res.data;
  } catch (error) {
    Swal.fire(`${error.response.data.message}😥`);
  }
};
export const apiGetPublicDistrict = async (provinceId) => {
  try {
    const res = await httpRequest.get(
      `address/provinces-districts/${provinceId}`
    );
    return res.data;
  } catch (error) {
    Swal.fire(`${error.response.data.message}😥`);
  }
};

export const apiGetPublicWard = async (districtId) => {
  try {
    const res = await httpRequest.get(`/address/districts-wards/${districtId}`);
    return res.data;
  } catch (error) {
    Swal.fire(`${error.response.data.message}😥`);
  }
};
