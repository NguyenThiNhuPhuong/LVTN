import Swal from "sweetalert2";
import * as httpRequest from "~/httpRequest/httpRequest";
//ADMIN

//GET LIST PRODUCT(INCLUDE SALE ,NEW, ACTIVE, NO ACTIVE)
export const getListProduct = async (page) => {
  try {
    const res = await httpRequest.get(`products?page=${page}`);
    return res;
  } catch (error) {
    console.log(error);
  }
};
//GET A PRODUCT
export const getAProduct = async (id) => {
  try {
    const res = await httpRequest.get(`products/${id}`);
    return res;
  } catch (error) {
    console.log(error);
  }
};
//GET LIST NEW PRODUCT
export const getListNewProduct = async () => {
  try {
    const res = await httpRequest.get(`products/new`);
    return res;
  } catch (error) {
    console.log(error);
  }
};
//GET LIST SALE PRODUCT
export const getListSaleProduct = async (pageIndex) => {
  try {
    const res = await httpRequest.get(`products/sale`);
    return res;
  } catch (error) {
    console.log(error);
  }
};
//GET PRODUCT BY ID
export const getListProductById = async (id) => {
  try {
    const res = await httpRequest.get(`/products/category/${id}`);
    return res;
  } catch (error) {
    console.log(error);
  }
};
//USER
export const getProduct = async (name, sort, pageIndex) => {
  try {
    const res = await httpRequest.get(
      `product?sort=${name}&asc=${sort}&pageSize=12&pageIndex=${pageIndex}`
    );
    return res;
  } catch (error) {
    console.log(error);
  }
};
export const searchProduct = async (search) => {
  try {
    const res = await httpRequest.get(`product?search=${search}`);
    return res;
  } catch (error) {
    console.log(error);
  }
};
//
export const removeProduct = async (id) => {
  try {
    const res = await httpRequest.remove(`products/${id}`);
    return res;
  } catch (error) {
    Swal.fire(`${error.response.data.message}😥`);
  }
};
// CREATE NEW PRODUCT
export const newProduct = async (values) => {
  try {
    const res = await httpRequest.postFormData(`products`, values);
    return res;
  } catch (error) {
    Swal.fire(`${error.response.data.message}😥`);
  }
};
//UPDATE PRODUCT
export const updateProduct = async ({ id, data }) => {
  try {
    const res = await httpRequest.postFormData(
      `products/${id}?_method=put`,
      data
    );
    return res;
  } catch (error) {
    console.log(error);
  }
};
