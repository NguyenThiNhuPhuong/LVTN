import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import Swal from "sweetalert2";
import * as registerService from "../../../services/registerService";

export const signUpUser = createAsyncThunk("user/signUpUser", async (user) => {
  try {
    const response = await registerService.signUpUser(user);
    if (response.success === true) {
      Swal.fire("Vui lòng Kiểm tra email để lấy mã xác nhận");
    }
    return response.success;
  } catch (e) {
    console.log(e);
  }
});
export const signInUser = createAsyncThunk("user/userLogin", async (user) => {
  try {
    const response = await registerService.signInUser(user);
    return response.success;
  } catch (e) {
    console.log(e);
  }
});
//login
const userInfoFromLocalStorage = localStorage.getItem("userInfo")
  ? JSON.parse(localStorage.getItem("userInfo"))
  : {};
const authSlice = createSlice({
  name: "auth",
  initialState: {
    userInfo: userInfoFromLocalStorage,
    err: "",
    isSusses: false,
    isLoading: false,
  },
  extraReducers: {
    [signUpUser.pending]: (state) => {
      state.isLoading = false;
    },
    [signUpUser.fulfilled]: (state, action) => {
      state.isLoading = true;
      state.isSuccess = action.payload;
    },
    [signInUser.pending]: (state) => {
      state.isLoading = false;
    },
    [signInUser.fulfilled]: (state, action) => {
      state.isLoading = true;
      state.isSuccess = action.payload;
    },
  },
});

export default authSlice.reducer;
