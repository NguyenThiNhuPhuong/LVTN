import * as httpRequest from "~/httpRequest/httpRequest";

//API GET LIST DISCOUNT
export const getDiscount = async () => {
  try {
    const res = await httpRequest.get(`discounts`);
    return res;
  } catch (error) {
    console.log(error);
  }
};
//GET LIST DISCOUNT BY DATE
export const getListDiscountByDate = async (date) => {
  try {
    const res = await httpRequest.get(`discounts?date=${date}`);
    return res;
  } catch (error) {
    console.log(error);
  }
};
//API REMOVE DISCOUNT
export const removeDiscount = async (id) => {
  try {
    const res = await httpRequest.remove(`discounts/${id}`);
    return res;
  } catch (error) {
    console.log(error);
  }
};
//API NEW DISCOUNT
export const newDiscount = async (newDiscount) => {
  try {
    const res = await httpRequest.post(`discounts`, newDiscount);
    return res;
  } catch (error) {
    console.log(error);
  }
};
export const updateDiscount = async ({
  id,
  code,
  description,
  discount,
  purchase_limit,
  expiration_date,
  minium_order,
}) => {
  try {
    const res = await httpRequest.put(`discounts/${id}`, {
      id,
      code,
      description,
      discount,
      purchase_limit,
      expiration_date,
      minium_order,
    });
    return res;
  } catch (error) {
    console.log(error);
  }
};
//API GET A DISCOUNT
export const getADiscount = async (id) => {
  try {
    console.log(id);
    const res = await httpRequest.get(`discounts/${id}`);
    return res;
  } catch (error) {
    console.log(error);
  }
};
//CHECK DISCOUNT
export const getDiscountByCode = async ({ code, price_product }) => {
  try {
    const res = await httpRequest.get(
      `discounts/list/check-discount?discount_code=${code}&price_product=${price_product}`
    );
    return res;
  } catch (error) {
    console.log(error);
  }
};
