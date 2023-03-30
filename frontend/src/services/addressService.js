import axiosDefault from "axios";

export const apiGetPublicProvinces = async () => {
  try {
    const res = await axiosDefault({
      method: "get",
      url: "https://vapi.vnappmob.com/api/province/",
    });
    return res;
  } catch (error) {
    console.log(error);
  }
};
export const apiGetPublicDistrict = async (provinceId) => {
  try {
    const response = await axiosDefault({
      method: "get",
      url: `https://vapi.vnappmob.com/api/province/district/${provinceId}`,
    });
    return response;
  } catch (error) {
    console.log(error);
  }
};
export const apiGetPublicWard = async (districtId) => {
  try {
    const response = await axiosDefault({
      method: "get",
      url: `https://vapi.vnappmob.com/api/province/ward/${districtId}`,
    });
    return response;
  } catch (error) {
    console.log(error);
  }
};
