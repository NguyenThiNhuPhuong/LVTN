import Swal from "sweetalert2";
import * as httpRequest from "~/httpRequest/httpRequest";
//ADMIN

//GET LIST PRODUCT FOR USER
export const getListProduct = async ({
  page,
  search,
  max_price,
  min_price,
  category_id,
}) => {
  try {
    let params = "";
    if (page !== undefined) {
      params += `page=${page}&`;
    }
    if (search !== undefined) {
      params += `string=${search}&`;
    }
    if (max_price !== undefined) {
      params += `max_price=${max_price}&`;
    }
    if (min_price !== undefined) {
      params += `min_price=${min_price}&`;
    }
    if (category_id !== undefined) {
      params += `category_id=${category_id}`;
    }

    const res = await httpRequest.get(`products?per_page=12&${params}`);
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
export const getListNewProduct = async ({
  page,
  search,
  max_price,
  min_price,
  category_id,
}) => {
  try {
    let params = "";
    if (page !== undefined) {
      params += `page=${page}&`;
    }
    if (search !== undefined) {
      params += `string=${search}&`;
    }
    if (max_price !== undefined) {
      params += `max_price=${max_price}&`;
    }
    if (min_price !== undefined) {
      params += `min_price=${min_price}&`;
    }
    if (category_id !== undefined) {
      params += `category_id=${category_id}`;
    }

    const res = await httpRequest.get(`products/new?per_page=12&${params}`);
    return res;
  } catch (error) {
    console.log(error);
  }
};

//GET LIST SALE PRODUCT
export const getListSaleProduct = async ({
  page,
  search,
  max_price,
  min_price,
  category_id,
}) => {
  try {
    let params = "";
    if (page !== undefined) {
      params += `page=${page}&`;
    }
    if (search !== undefined) {
      params += `string=${search}&`;
    }
    if (max_price !== undefined) {
      params += `max_price=${max_price}&`;
    }
    if (min_price !== undefined) {
      params += `min_price=${min_price}&`;
    }
    if (category_id !== undefined) {
      params += `category_id=${category_id}`;
    }

    const res = await httpRequest.get(`products/sale?per_page=12&${params}`);
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

//REMOVE PRODUCT
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
