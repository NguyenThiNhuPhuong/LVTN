import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import * as productService from "../../../services/productService";
import { setListFile } from "../file/FileSlice";

// API CREATE GET LIST PRODUCT
export const getAllProducts = createAsyncThunk(
  "product/getAllProducts",
  async (page) => {
    const response = await productService.getListProduct(page);
    return response;
  }
);
// API  GET LIST SALE PRODUCT
export const getSaleProducts = createAsyncThunk(
  "product/getSaleProducts",
  async () => {
    const response = await productService.getListSaleProduct();
    console.log(response);
    return response.rows;
  }
);
// API GET LIST NEW PRODUCT
export const getNewProducts = createAsyncThunk(
  "product/getNewProducts",
  async () => {
    const response = await productService.getListNewProduct();
    return response.rows;
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
    console.log(response);
    return response.data.product;
  }
);
// API GET A PRODUCT
export const getAProduct = createAsyncThunk(
  "product/getAProduct",
  async (id) => {
    const response = await productService.getAProduct(id);
    return response.product;
  }
);
const productSlice = createSlice({
  name: "product",
  initialState: {
    productList: [],
    saleProductList: [],
    newProductList: [],

    searchResults: [],
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

    currentPage: 1,
    totalPages: 1,
  },
  reducers: {
    setNewProduct(state, action) {
      state.productNew = action.payload;
    },
    setUpdateProduct(state, action) {
      state.productUpdate = action.payload;
    },
    resetNewProduct(state) {
      state.isSuccessNew = false;
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
    setSearchResults(state, action) {
      state.searchResults = action.payload;
    },
    setNewPage(state, action) {
      state.currentPage = action.payload;
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
      state.saleProductList = action.payload;
    },
    [getNewProducts.pending]: (state) => {
      state.isLoading = true;
    },
    [getNewProducts.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.newProductList = action.payload;
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
  setSearchResults,
  setNewPage,
} = productSlice.actions;

export default productSlice.reducer;
