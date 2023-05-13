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
//TOTAL REVENUE PER YEAR US
export const totalRevenue = async (year) => {
  try {
    const res = await httpRequest.get(`revenue/orders/full-month?year=${year}`);
    return res;
  } catch (error) {
    console.log(error);
  }
};
//TOTAL ORDER STATUS
export const totalOrderStatus = async () => {
  try {
    const res = await httpRequest.get(`orders/total/status`);
    return res;
  } catch (error) {
    console.log(error);
  }
};
