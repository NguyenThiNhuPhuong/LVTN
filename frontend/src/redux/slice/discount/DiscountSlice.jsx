import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import * as discountService from "../../../services/discountService";

export const getDiscounts = createAsyncThunk(
  "discount/getDiscounts",
  async () => {
    try {
      const response = await discountService.getDiscount();
      return response.discounts;
    } catch (e) {
      console.log(e);
    }
  }
);
const discountSlice = createSlice({
  name: "discount",
  initialState: {
    discountList: [],
    isLoading: false,
  },
  extraReducers: {
    [getDiscounts.pending]: (state) => {
      state.isLoading = false;
    },
    [getDiscounts.fulfilled]: (state, action) => {
      state.isLoading = true;
      state.discountList = action.payload;
    },
  },
});

export default discountSlice.reducer;
//
