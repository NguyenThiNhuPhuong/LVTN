import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import * as orderService from "../../../services/orderService";

// API CREATE GET LIST PRODUCT
// export const getAllProducts = createAsyncThunk(
//   "product/getAllProducts",
//   async () => {
//     try {
//       const response = await productService.getListHomeProduct();
//       return response.rows;
//     } catch (e) {
//       console.log(e);
//     }
//   }
// );

// API CREATE NEW ORDER
export const newOrder = createAsyncThunk("order/newOrder", async (orderNew) => {
  const response = await orderService.newOrder(orderNew);
  console.log(response);
  return response.order;
});
//API REMOVE PRODUCT
// export const removeProduct = createAsyncThunk(
//   "product/removeProduct",
//   async (id) => {
//     const response = await productService.removeProduct(id);
//     return response.data.message;
//   }
// );
//API UPDATE CATEGORY
// export const updateCategory = createAsyncThunk(
//   "category/updateCategory",
//   async (categoryUpdate) => {
//     const response = await productService.updateProduct(categoryUpdate);
//     return response.category;
//   }
// );
// API GET A PRODUCT
// export const getAProduct = createAsyncThunk(
//   "product/getAProduct",
//   async (id) => {
//     const response = await productService.getAProduct(id);
//     return response.product;
//   }
// );
const orderSlice = createSlice({
  name: "order",
  initialState: {
    // productList: [],
    // searchResults: [],
    // relatedProductList: [],
    // isLoading: false,

    // productSingle: {},
    // isSuccessSingle: false,

    // productUpdate: {},
    // isLoadingUpdate: false,

    orderNew: {},
    isSuccessNew: false,

    // isLoadingRemove: false,
    // alertDeleteSuccess: "",
  },
  reducers: {
    setNewOrder(state, action) {
      state.productNew = action.payload;
    },
    // setUpdateProduct(state, action) {
    //   state.productUpdate = action.payload;
    // },
    // resetNewProduct(state) {
    //   state.isSuccessNew = false;
    // },
    // resetRemoveProduct: (state) => {
    //   state.alertDeleteSuccess = "";
    // },
    // removeSelectedProductShow: (state) => {
    //   state.productSingle = {};
    // },
    // setSearchResults(state, action) {
    //   state.searchResults = action.payload;
    // },
  },
  extraReducers: {
    // [getAllProducts.pending]: (state) => {
    //   state.isLoading = true;
    // },
    // [getAllProducts.fulfilled]: (state, action) => {
    //   state.isLoading = false;
    //   state.productList = action.payload;
    // },
    // [getAProduct.pending]: (state) => {
    //   state.isLoading = true;
    // },
    // [getAProduct.fulfilled]: (state, action) => {
    //   state.isLoading = false;
    //   state.productSingle = action.payload;
    // },
    [newOrder.pending]: (state) => {
      state.isLoading = true;
    },
    [newOrder.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.orderNew = {};
      state.isSuccessNew = action.payload ? true : false;
    },
    // [removeProduct.pending]: (state) => {
    //   state.isLoadingRemove = true;
    // },
    // [removeProduct.fulfilled]: (state, action) => {
    //   state.isLoadingRemove = false;
    //   state.alertDeleteSuccess = action.payload;
    // },
  },
});
export const {
  //   removeSelectedProductShow,
  //   removeLatedProductList,
  //   setNewProduct,
  //   setUpdateProduct,
  //   resetNewProduct,
  //   resetRemoveProduct,
  //   setSearchResults,
} = orderSlice.actions;

export default orderSlice.reducer;
