import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import * as addressService from "../../../services/addressService";

export const apiGetPublicProvinces = createAsyncThunk(
  "address/apiGetPublicProvinces",
  async () => {
    const response = await addressService.apiGetPublicProvinces();
    return response.rows;
  }
);
export const apiGetPublicDistrict = createAsyncThunk(
  "address/apiGetPublicDistrict",
  async (provinceId) => {
    const response = await addressService.apiGetPublicDistrict(provinceId);

    return response.rows;
  }
);
export const apiGetPublicWard = createAsyncThunk(
  "address/apiGetPublicWard",
  async (districtId) => {
    const response = await addressService.apiGetPublicWard(districtId);
    return response.rows;
  }
);

const addressSlice = createSlice({
  name: "auth",
  initialState: {
    provincesList: [],
    districtList: [],
    wardList: [],
    province: "",
    district: "",
    ward: "",
  },
  reducers: {
    setValueProvince(state, action) {
      state.province = action.payload;
    },
    setValueDistrict(state, action) {
      state.district = action.payload;
    },
    setValueWard(state, action) {
      state.ward = action.payload;
    },
  },
  extraReducers: {
    [apiGetPublicProvinces.pending]: (state) => {
      state.isLoading = false;
    },
    [apiGetPublicProvinces.fulfilled]: (state, action) => {
      state.isLoading = true;
      state.provincesList = action.payload;
    },
    [apiGetPublicDistrict.pending]: (state) => {
      state.isLoading = false;
    },
    [apiGetPublicDistrict.fulfilled]: (state, action) => {
      state.isLoading = true;
      state.districtList = action.payload;
    },
    [apiGetPublicWard.pending]: (state) => {
      state.isLoading = false;
    },
    [apiGetPublicWard.fulfilled]: (state, action) => {
      state.isLoading = true;
      state.wardList = action.payload;
    },
  },
});

export default addressSlice.reducer;
export const { setValueProvince, setValueDistrict, setValueWard } =
  addressSlice.actions;
