import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import Swal from "sweetalert2";
import * as registerService from "../../../services/registerService";

export const signUpRegister = createAsyncThunk(
  "user/signUpRegister",
  async (user) => {
    try {
      const response = await registerService.signUpRegister(user);
      if (response.success === true) {
        Swal.fire("Vui lòng Kiểm tra email để lấy mã xác nhận");
      }
      return response.success;
    } catch (e) {
      console.log(e);
    }
  }
);
export const signInRegister = createAsyncThunk(
  "user/userLogin",
  async (user) => {
    try {
      const response = await registerService.signInRegister(user);
      return response.success;
    } catch (e) {
      console.log(e);
    }
  }
);
const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: "",
    token: "",
    err: "",
    isSusses: false,
    isLoading: false,
  },
  extraReducers: {
    [signUpRegister.pending]: (state) => {
      state.isLoading = false;
    },
    [signUpRegister.fulfilled]: (state, action) => {
      state.isLoading = true;
      state.isSuccess = action.payload;
    },
    [signInRegister.pending]: (state) => {
      state.isLoading = false;
    },
    [signInRegister.fulfilled]: (state, action) => {
      state.isLoading = true;
      state.isSuccess = action.payload;
    },
  },
});

export default authSlice.reducer;
