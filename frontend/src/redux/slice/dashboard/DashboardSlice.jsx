import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import * as dashboardService from "../../../services/dashboardService";
//API GET LISTIEM IN DASHBOARD
export const getTotalItem = createAsyncThunk("dashboard/getList", async () => {
  const response = await dashboardService.totalItem();
  console.log(response);
  return response;
});

const dashboardSlice = createSlice({
  name: "dashboard",
  initialState: {
    dashboardList: {},
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
  },
});

export default dashboardSlice.reducer;
export const {} = dashboardSlice.actions;
