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
// API CREATE GET LIST ORDER FOR USER
export const getListOrderUser = createAsyncThunk(
  "order/getListOrderUser",
  async (id) => {
    const response = await orderService.getListOrderUser(id);
    return response.rows;
  }
);
// API GET A ORDER
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
    const response = await orderService.updateStatusOrder(order);
    return response.data.message;
  }
);

const orderSlice = createSlice({
  name: "order",
  initialState: {
    orderList: [],
    orderListUser: [],
    orderSingle: {},

    orderNew: {},
    isSuccessNew: false,

    isUpdateStatus: false,
  },
  reducers: {
    setNewOrder(state, action) {
      state.orderNew = action.payload;
    },
    resetStatusOrder(state) {
      state.isUpdateStatus = false;
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
    [getListOrderUser.pending]: (state) => {
      state.isLoading = true;
    },
    [getListOrderUser.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.orderListUser = action.payload;
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
      state.isUpdateStatus = action.payload ? true : false;
    },
  },
});
export const { resetStatusOrder } = orderSlice.actions;

export default orderSlice.reducer;
