import * as httpRequest from "~/httpRequest/httpRequest";
//LIST TOTAL ITEM OF USER, PRODUCT, ORDER, SLICE
export const totalItem = async () => {
  try {
    const res = await httpRequest.get(`dashboard/total`);
    return res;
  } catch (error) {
    console.log(error);
  }
};
