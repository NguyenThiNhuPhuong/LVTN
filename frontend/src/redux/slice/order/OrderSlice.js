import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import * as orderService from "../../../services/orderService";

// API CREATE GET LIST ORDER
export const getListOrder = createAsyncThunk(
  "order/getListOrder",
  async (params) => {
    const response = await orderService.getListOrder(params);
    return response;
  }
);
// API CREATE GET LIST ORDER FOR USER
export const getListOrderUser = createAsyncThunk(
  "order/getListOrderUser",
  async (id) => {
    const response = await orderService.getListOrderUser(id);
    return response;
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

    Alert: "",

    currentPage: 0,
    totalPages: 0,
    params: {
      page: "",
      status_id: "",
    },
  },
  reducers: {
    setNewOrder(state, action) {
      state.orderNew = action.payload;
    },

    setParams(state, action) {
      state.params = action.payload;
    },
    resetParams(state) {
      state.params = {
        page: "",
        per_page: "",
        status_id: "",
      };
    },
    resetAlert(state) {
      state.Alert = "";
    },
  },
  extraReducers: {
    [getListOrder.pending]: (state) => {
      state.isLoading = true;
    },
    [getListOrder.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.orderList = action.payload.data;
      state.currentPage = action.payload.currentPage;
      state.totalPages = action.payload.totalPages;
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
      state.Alert = action.payload;
    },
  },
});
export const { setParams, resetParams, resetAlert } = orderSlice.actions;

export default orderSlice.reducer;
