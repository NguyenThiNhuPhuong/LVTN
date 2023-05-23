import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import * as registerService from "../../../services/registerService";
import Cookies from "js-cookie";
//REGISTER
export const signUpUser = createAsyncThunk("user/signUpUser", async (user) => {
  const response = await registerService.signUpUser(user);
  return response.message;
});
//LOGIN
export const signInUser = createAsyncThunk("user/userLogin", async (user) => {
  const response = await registerService.signInUser(user);
  return response.data;
});
//CHANGE PASSWORD
export const changePassword = createAsyncThunk(
  "user/changePassword",
  async (user) => {
    const response = await registerService.changePassword(user);
    console.log(response.data.message);

    return response.data.message;
  }
);
//FORGET PASSWORD
export const sendEmail = createAsyncThunk("user/sendEmail", async (email) => {
  const response = await registerService.sendEmail(email);
  return response.data.message;
});
export const confirmPassword = createAsyncThunk(
  "user/confirmPassword",
  async (value) => {
    const response = await registerService.confirmPassword(value);
    return response.data.message;
  }
);
export const resetPassword = createAsyncThunk(
  "user/resetPassword ",
  async (value) => {
    const response = await registerService.resetPassword(value);
    return response.data.message;
  }
);
const userInfoFromLocalStorage = localStorage.getItem("userInfo")
  ? Cookies.get("token") && JSON.parse(localStorage.getItem("userInfo"))
  : {};
const authSlice = createSlice({
  name: "auth",
  initialState: {
    userInfo: userInfoFromLocalStorage,
    err: "",
    messenger: "",
    isSusses: false,
    isLoading: false,
    role: "",
    token: Cookies.get("token"),
    valuesChangePassword: {},
  },
  reducers: {
    logoutUser: (state) => {
      state.userInfo = "";
      state.role = "";
      state.token = null;
      Cookies.remove("token");
      localStorage.removeItem("userInfo");
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

    setValueChangePassword(state, action) {
      state.valuesChangePassword = action.payload;
    },
  },
  extraReducers: {
    [signUpUser.pending]: (state) => {
      state.isLoading = false;
    },
    [signUpUser.fulfilled]: (state, action) => {
      state.isLoading = true;
      state.isSusses = action.payload !== "" ? true : false;
    },
    [signInUser.pending]: (state) => {
      state.isLoading = true;
    },
    [signInUser.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.isSusses = false;
      state.userInfo = action.payload.user;
      localStorage.setItem("userInfo", JSON.stringify(state.userInfo));
      console.log("dmowed", action.payload);
      state.role = action.payload.user.type;
      state.token = Cookies.set("token", action.payload.access_token, {
        expires: 1 / 24,
      });
    },
    [changePassword.pending]: (state) => {
      state.isLoading = true;
    },
    [changePassword.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.messenger = action.payload;
    },
    [sendEmail.pending]: (state) => {
      state.isLoading = true;
      state.messenger = "";
    },
    [sendEmail.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.messenger = action.payload;
    },
    [confirmPassword.pending]: (state) => {
      state.isLoading = true;
      state.messenger = "";
    },
    [confirmPassword.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.messenger = action.payload;
    },
    [resetPassword.pending]: (state) => {
      state.isLoading = true;
      state.messenger = "";
    },
    [resetPassword.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.messenger = action.payload;
    },
  },
});

export default authSlice.reducer;
export const {
  logoutUser,
  resetRegister,
  getToken,
  setUserInfo,
  setValueChangePassword,
} = authSlice.actions;
