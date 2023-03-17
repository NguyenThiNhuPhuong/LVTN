import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import * as categoryService from "../../../services/categoryService";
export const getCategory = createAsyncThunk(
  "category/getCategory",
  async () => {
    try {
      const response = await categoryService.getListCategory();
      return response.categories;
    } catch (e) {
      console.log(e);
    }
  }
);

const categorySlice = createSlice({
  name: "category",
  initialState: {
    categoryList: [],
    isLoading: false,
  },
  extraReducers: {
    [getCategory.pending]: (state, action) => {
      state.isLoading = false;
    },
    [getCategory.fulfilled]: (state, action) => {
      state.isLoading = true;
      state.categoryList = action.payload;
    },
  },
});

export default categorySlice.reducer;
