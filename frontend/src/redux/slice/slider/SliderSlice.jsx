import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import * as sliderService from "../../../services/sliderService";
export const getSlider = createAsyncThunk("slider/getSlider", async () => {
  try {
    const response = await sliderService.getListSlider();
    return response.sliders;
  } catch (e) {
    console.log(e);
  }
});

const sliderSlice = createSlice({
  name: "slider",
  initialState: {
    sliderList: [],
    isLoading: false,
  },
  extraReducers: {
    [getSlider.pending]: (state, action) => {
      state.isLoading = false;
    },
    [getSlider.fulfilled]: (state, action) => {
      state.isLoading = true;
      state.sliderList = action.payload;
    },
  },
});

export default sliderSlice.reducer;
