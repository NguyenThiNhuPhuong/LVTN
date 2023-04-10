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
  },
  reducers: {
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
  },
});
export const { removeSelectedProductShow, removeLatedProductList } =
  productSlice.actions;

export default productSlice.reducer;
