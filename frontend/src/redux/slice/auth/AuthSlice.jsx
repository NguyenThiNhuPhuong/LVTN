import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import * as registerService from "../../../services/registerService";

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
function setToken(userToken) {
  sessionStorage.setItem("token", JSON.stringify(userToken));
}

const tokenFromLocalStorage = localStorage.getItem("cart")
  ? JSON.parse(localStorage.getItem("cart"))
  : {};

const authSlice = createSlice({
  name: "auth",
  initialState: {
    userInfo: {},
    err: "",
    isSusses: false,
    isLoading: false,
    role: "",
    token: tokenFromLocalStorage,
  },
  reducers: {
    logoutUser: (state) => {
      state.userInfo = {};
      state.isSusses = false;
      state.role = "";
      state.token = localStorage.removeItem("token");
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
      state.role = action.payload.user.type;
      state.token = localStorage.setItem(
        "token",
        JSON.stringify(action.payload.access_token)
      );
    },
  },
});

export default authSlice.reducer;
export const { logoutUser } = authSlice.actions;
