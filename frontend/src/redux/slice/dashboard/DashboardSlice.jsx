import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import * as dashboardService from "../../../services/dashboardService";
//API GET LISTIEM IN DASHBOARD
export const getTotalItem = createAsyncThunk(
  "dashboard/getTotalItem",
  async () => {
    const response = await dashboardService.totalItem();
    return response;
  }
);
//API TOTAL REVENUE PER YEAR US
export const getTotalRevenue = createAsyncThunk(
  "dashboard/getTotalRevenue",
  async (year) => {
    const response = await dashboardService.totalRevenue(year);
    const values = Object.values(response[0]);

    return values;
  }
);
//API TOTAL ORDER STATUS
export const getTotalOrderStatus = createAsyncThunk(
  "dashboard/getTotalOrderStatus",
  async () => {
    const response = await dashboardService.totalOrderStatus();
    const values = Object.values(response[0]);
    console.log(values);
    return values;
  }
);
const dashboardSlice = createSlice({
  name: "dashboard",
  initialState: {
    dashboardList: {},
    totalRevenue: [],
    totalOrderStatus: [],
    isLoading: false,
  },
  reducers: {},
  extraReducers: {
    [getTotalItem.pending]: (state) => {
      state.isLoading = true;
    },
    [getTotalItem.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.dashboardList = action.payload;
    },
    [getTotalRevenue.pending]: (state) => {
      state.isLoading = true;
    },
    [getTotalRevenue.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.totalRevenue = action.payload;
    },

    [getTotalOrderStatus.pending]: (state) => {
      state.isLoading = true;
    },
    [getTotalOrderStatus.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.totalOrderStatus = action.payload;
    },
  },
});

export default dashboardSlice.reducer;
export const {} = dashboardSlice.actions;
