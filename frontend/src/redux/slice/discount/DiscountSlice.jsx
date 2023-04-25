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
    code: "",
    discount: 30000,
  },
  reducers: {
    setCode(state, action) {
      state.code = action.payload;
    },
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
export const { setCode } = discountSlice.actions;
export default discountSlice.reducer;
//
