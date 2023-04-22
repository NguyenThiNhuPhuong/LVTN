import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import * as registerService from "../../../services/registerService";
import Cookies from "js-cookie";

export const signUpUser = createAsyncThunk("user/signUpUser", async (user) => {
  try {
    const response = await registerService.signUpUser(user);
    return response;
  } catch (e) {
    console.log(e);
  }
});
export const signInUser = createAsyncThunk("user/userLogin", async (user) => {
  try {
    const response = await registerService.signInUser(user);
    return response.data;
  } catch (e) {
    console.log(e);
  }
});
const userInfoFromLocalStorage = localStorage.getItem("userInfo")
  ? Cookies.get("token") && JSON.parse(localStorage.getItem("userInfo"))
  : {};
const authSlice = createSlice({
  name: "auth",
  initialState: {
    userInfo: userInfoFromLocalStorage,
    err: "",
    isSusses: false,
    isLoading: false,
    role: "",
    token: Cookies.get("token"),
  },
  reducers: {
    logoutUser: (state) => {
      state.userInfo = localStorage.removeItem("userInfo");
      state.role = "";
      state.token = Cookies.remove("token");
    },
    resetRegister: (state) => {
      state.isSusses = false;
    },
    getToken: (state) => {
      state.token = Cookies.get("token");
    },
    setUserInfo(state, action) {
      state.userInfo = action.payload;
    },
  },
  extraReducers: {
    [signUpUser.pending]: (state) => {
      state.isLoading = false;
    },
    [signUpUser.fulfilled]: (state, action) => {
      state.isLoading = true;
      state.isSusses = action.payload.user ? true : false;
    },
    [signInUser.pending]: (state) => {
      state.isLoading = false;
    },
    [signInUser.fulfilled]: (state, action) => {
      state.isLoading = true;
      state.isSusses = false;
      state.userInfo = action.payload.user;
      localStorage.setItem("userInfo", JSON.stringify(state.userInfo));
      state.role = action.payload.user.type;
      state.token = Cookies.set("token", action.payload.access_token, {
        expires: 1 / 24,
      });
    },
  },
});

export default authSlice.reducer;
export const { logoutUser, resetRegister, getToken, setUserInfo } =
  authSlice.actions;
