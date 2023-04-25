import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import * as orderService from "../../../services/orderService";

// API CREATE GET LIST ORDER
export const getListOrder = createAsyncThunk("order/getListOrder", async () => {
  const response = await orderService.getListOrder();
  return response.rows;
});
// API CREATE GET A ORDER
export const getAOrder = createAsyncThunk("order/getAOrder", async (id) => {
  const response = await orderService.getAOrder(id);
  return response.order;
});
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
    orderList: [],
    // searchResults: [],
    // relatedProductList: [],
    // isLoading: false,

    orderSingle: {},
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
      state.orderNew = action.payload;
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
    [getListOrder.pending]: (state) => {
      state.isLoading = true;
    },
    [getListOrder.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.orderList = action.payload;
    },
    [getAOrder.pending]: (state) => {
      state.isLoading = true;
    },
    [getAOrder.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.orderSingle = action.payload;
    },
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
