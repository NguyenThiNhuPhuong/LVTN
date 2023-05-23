import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import * as sliderService from "../../../services/sliderService";

export const getListSlider = createAsyncThunk(
  "slider/getListSlider",
  async (params) => {
    const response = await sliderService.getListSlider(params);
    return response[0].data;
  }
);
export const getASlider = createAsyncThunk("slider/getASlider", async (id) => {
  const response = await sliderService.getASlider(id);
  return response.slider;
});
export const removeSlider = createAsyncThunk(
  "slider/removeSlider",
  async (id) => {
    const response = await sliderService.removeSlider(id);
    return response;
  }
);
export const updateSlider = createAsyncThunk(
  "slider/updateSlider",
  async (sliderUpdate) => {
    console.log(sliderUpdate);
    const response = await sliderService.updateSlider(sliderUpdate);
    return response.category;
  }
);
export const newSlider = createAsyncThunk(
  "slider/newSlider",
  async (newSlider) => {
    const response = await sliderService.newSlider(newSlider);
    return response.slider;
  }
);
const sliderSlice = createSlice({
  name: "slider",
  initialState: {
    sliderList: [],
    isLoading: false,
    isLoadingRemove: false,
    alertDeleteSuccess: "",
    sliderSingle: {},
    sliderUpdate: {},
    sliderNew: {},
    params: {
      page: "",
      per_page: "",
      active: "",
    },
  },
  reducers: {
    resetRemoveSlider: (state) => {
      state.alertDeleteSuccess = "";
    },
    setSingleSlider(state, action) {
      state.sliderSingle = action.payload;
    },
    setParams(state, action) {
      state.params = action.payload;
    },
    resetUpdateSlider: (state) => {
      state.sliderUpdate = {};
    },
    resetNewSlider: (state) => {
      state.sliderNew = {};
      state.sliderSingle = {};
    },
  },
  extraReducers: {
    [getListSlider.pending]: (state, action) => {
      state.isLoading = true;
    },
    [getListSlider.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.sliderList = action.payload;
    },
    [getASlider.pending]: (state) => {
      state.isLoading = true;
      state.sliderSingle = {};
    },
    [getASlider.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.sliderSingle = action.payload;
    },
    [removeSlider.pending]: (state) => {
      state.isLoadingRemove = true;
    },
    [removeSlider.fulfilled]: (state, action) => {
      state.isLoadingRemove = false;
      state.alertDeleteSuccess = action.payload;
    },

    [updateSlider.pending]: (state) => {
      state.isLoadingUpdate = true;
    },
    [updateSlider.fulfilled]: (state, action) => {
      state.isLoadingUpdate = false;
      state.sliderUpdate = action.payload;
    },
    [newSlider.pending]: (state) => {
      state.isSuccessNew = false;
    },
    [newSlider.fulfilled]: (state, action) => {
      state.sliderNew = action.payload;
    },
  },
});
export const {
  resetRemoveSlider,
  setSingleSlider,
  setParams,
  resetUpdateSlider,
  resetNewSlider,
} = sliderSlice.actions;

export default sliderSlice.reducer;
