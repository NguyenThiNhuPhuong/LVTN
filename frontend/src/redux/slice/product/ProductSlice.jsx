import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import * as productService from "../../../services/productService";
import Swal from "sweetalert2";

// API CREATE GET LIST PRODUCT FOR USER
export const getAllProducts = createAsyncThunk(
  "product/getAllProducts",
  async (params) => {
    const response = await productService.getListProduct(params);
    return response;
  }
);
// API  GET LIST SALE PRODUCT
export const getSaleProducts = createAsyncThunk(
  "product/getSaleProducts",
  async (params) => {
    const response = await productService.getListSaleProduct(params);
    return response;
  }
);
// API GET LIST NEW PRODUCT
export const getNewProducts = createAsyncThunk(
  "product/getNewProducts",
  async (params) => {
    const response = await productService.getListNewProduct(params);
    return response;
  }
);
// API CREATE NEW PRODUCT
export const newProduct = createAsyncThunk(
  "product/newProduct",
  async (productNew) => {
    const response = await productService.newProduct(productNew);
    return response.data.product;
  }
);
//API REMOVE PRODUCT
export const removeProduct = createAsyncThunk(
  "product/removeProduct",
  async (id) => {
    const response = await productService.removeProduct(id);
    return response.data.message;
  }
);
//API UPDATE PRODUCT
export const updateProduct = createAsyncThunk(
  "product/updateProduct",
  async (productUpdate) => {
    const response = await productService.updateProduct(productUpdate);
    return response.data.product;
  }
);
// API GET A PRODUCT
export const getAProduct = createAsyncThunk(
  "product/getAProduct",
  async (id) => {
    const response = await productService.getAProduct(id);
    return { ...response.product, cartNum: 1 };
  }
);
const productSlice = createSlice({
  name: "product",
  initialState: {
    productList: [],
    saleProductList: [],
    newProductList: [],
    params: {
      page: "",
      per_page: "",
      max_price: "",
      min_price: "",
      search: "",
      category_id: "",
    },
    resultSearch: "",
    relatedProductList: [],
    isLoading: false,

    productSingle: {},
    isSuccessSingle: false,

    productUpdate: {},
    isSuccessUpdate: false,

    productNew: {},
    isSuccessNew: false,

    isLoadingRemove: false,
    alertDeleteSuccess: "",
    currentPage: 0,
    totalPages: 0,

    namePage: "",
  },
  reducers: {
    setNewProduct(state, action) {
      state.productNew = action.payload;
    },
    resetNewProduct(state) {
      state.isSuccessNew = false;
    },
    setUpdateProduct(state, action) {
      state.productUpdate = action.payload;
    },
    resetUpdateProduct(state) {
      state.isSuccessUpdate = false;
    },
    resetRemoveProduct: (state) => {
      state.alertDeleteSuccess = "";
    },
    removeSelectedProductShow: (state) => {
      state.productSingle = {};
    },
    setResultSearch(state, action) {
      state.resultSearch = action.payload;
    },
    resetResultSearch(state, action) {
      state.resultSearch = "";
    },
    setParams(state, action) {
      state.params = action.payload;
    },
    resetParams(state) {
      state.params = {
        page: "",
        per_page: "",
        max_price: "",
        min_price: "",
        search: "",
        category_id: "",
      };
    },
    setNamePage(state, action) {
      state.namePage = action.payload;
    },
    increaseProduct: (state, action) => {
      const product = action.payload;
      console.log("....", product.cartNum);
      console.log("in", product);
      if (product.cartNum < product.num_current) {
        state.productSingle = { ...product, cartNum: product.cartNum + 1 };
      } else {
        Swal.fire("The Internet?", `Rất tiếc sản phẩm đã hết `, "question");
      }
    },
    decreaseProduct: (state, action) => {
      const product = action.payload;
      if (product.cartNum > 1) {
        state.productSingle = {
          ...product,
          cartNum: product.cartNum - 1,
        };
      }
    },
  },
  extraReducers: {
    [getAllProducts.pending]: (state) => {
      state.isLoading = true;
    },
    [getAllProducts.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.productList = action.payload.data;
      state.currentPage = action.payload.currentPage;
      state.totalPages = action.payload.totalPages;
    },
    [getSaleProducts.pending]: (state) => {
      state.isLoading = true;
    },
    [getSaleProducts.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.saleProductList = action.payload.data;
      state.currentPage = action.payload.currentPage;
      state.totalPages = action.payload.totalPages;
    },
    [getNewProducts.pending]: (state) => {
      state.isLoading = true;
    },
    [getNewProducts.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.newProductList = action.payload.data;
      state.currentPage = action.payload.currentPage;
      state.totalPages = action.payload.totalPages;
    },
    [getAProduct.pending]: (state) => {
      state.isLoading = true;
    },
    [getAProduct.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.productSingle = action.payload;
    },
    [newProduct.pending]: (state) => {
      state.isLoading = true;
    },
    [newProduct.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.productNew = {};
      state.isSuccessNew = action.payload ? true : false;
    },

    [updateProduct.pending]: (state) => {
      state.isLoading = true;
    },
    [updateProduct.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.isSuccessUpdate = action.payload;
    },
    [removeProduct.pending]: (state) => {
      state.isLoadingRemove = true;
    },
    [removeProduct.fulfilled]: (state, action) => {
      state.isLoadingRemove = false;
      state.alertDeleteSuccess = action.payload;
    },
  },
});
export const {
  removeSelectedProductShow,
  removeLatedProductList,
  setNewProduct,
  setUpdateProduct,
  resetNewProduct,
  resetRemoveProduct,
  resetUpdateProduct,
  setParams,
  resetParams,
  setResultSearch,
  resetResultSearch,
  setNamePage,
  increaseProduct,
  decreaseProduct,
} = productSlice.actions;

export default productSlice.reducer;
