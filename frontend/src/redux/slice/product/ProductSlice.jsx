import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import * as productService from "../../../services/productService";

export const getAllProducts = createAsyncThunk(
  "product/getAllProducts",
  async () => {
    try {
      const response = await productService.getListHomeProduct();
      return response.products;
    } catch (e) {
      console.log(e);
    }
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

export const getAProduct = createAsyncThunk(
  "product/getAProduct",
  async (id) => {
    try {
      const response = await productService.getAProduct(id);

      return {
        relatedProductList: await productService.getProductByCategoryId(
          response.product[0].category
        ),
        selectProductShow: response.product[0],
      };
    } catch (e) {
      console.log(e);
    }
  }
);
const productSlice = createSlice({
  name: "product",
  initialState: {
    productList: [],
    relatedProductList: [],

    isLoading: false,
    selectProductShow: {},
    idSelectProductShow: "",

    productSingle: {},
    isSuccessSingle: false,

    productUpdate: {},
    isLoadingUpdate: false,

    productNew: {},
    isSuccessNew: false,

    isLoadingRemove: false,
    alertDeleteSuccess: "",
  },
  reducers: {
    setNewProduct(state, action) {
      state.productNew = action.payload;
    },
    resetNewProduct(state) {
      state.isSuccessNew = false;
    },
    removeSelectedProductShow: (state) => {
      state.selectProductShow = {};
    },
    removeLatedProductList: (state) => {
      state.selectProductShow = {};
      state.relatedProductList = [];
    },
  },
  extraReducers: {
    [getAllProducts.pending]: (state) => {
      state.isLoading = false;
    },
    [getAllProducts.fulfilled]: (state, action) => {
      state.isLoading = true;
      state.productList = action.payload;
    },
    [getAProduct.pending]: (state) => {
      state.isLoading = false;
    },
    [getAProduct.fulfilled]: (state, action) => {
      state.isLoading = true;
      state.selectProductShow = action.payload.selectProductShow;
      state.relatedProductList = action.payload.relatedProductList.products;
    },
    [newProduct.pending]: (state) => {
      state.isLoading = false;
    },
    [newProduct.fulfilled]: (state, action) => {
      state.isLoading = true;
      state.productNew = {};
      state.isSuccessNew = action.payload ? true : false;
    },
  },
});
export const {
  removeSelectedProductShow,
  removeLatedProductList,
  setNewProduct,
  resetNewProduct,
} = productSlice.actions;

export default productSlice.reducer;
