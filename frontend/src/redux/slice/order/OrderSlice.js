import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import * as orderService from "../../../services/orderService";

// API CREATE GET LIST ORDER
export const getListOrder = createAsyncThunk(
  "order/getListOrder",
  async (status_id) => {
    const response = await orderService.getListOrder(status_id);
    return response.rows;
  }
);
// API CREATE GET A ORDER
export const getAOrder = createAsyncThunk("order/getAOrder", async (id) => {
  const response = await orderService.getAOrder(id);
  return response.order;
});
// API CREATE NEW ORDER
export const newOrder = createAsyncThunk("order/newOrder", async (orderNew) => {
  const response = await orderService.newOrder(orderNew);
  return response.order;
});
//UPDATE STATUS ORDER
export const updateStatusOrder = createAsyncThunk(
  "order/updateStatusOrder",
  async (order) => {
    const response = await orderService.newOrder(order);
    return response.order;
  }
);

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

    orderSingle: {},

    orderNew: {},
    isSuccessNew: false,

    statusOrder: 0,
  },
  reducers: {
    setNewOrder(state, action) {
      state.orderNew = action.payload;
    },
    setStatusOrder(state, action) {
      state.statusOrder = action.payload;
    },
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
    [updateStatusOrder.pending]: (state) => {
      state.isLoading = true;
    },
    [updateStatusOrder.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.orderNew = {};
      state.isSuccessNew = action.payload ? true : false;
    },
  },
});
export const { setStatusOrder } = orderSlice.actions;

export default orderSlice.reducer;
