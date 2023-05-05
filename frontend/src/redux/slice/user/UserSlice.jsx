import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import * as userService from "../../../services/userService";

export const getListUser = createAsyncThunk("user/getListUser", async () => {
  const response = await userService.getListUser();
  return response.data.rows;
});
export const getAUser = createAsyncThunk("user/getAUser", async (user) => {
  const response = await userService.getAUser();
  return response.user;
});
export const newUser = createAsyncThunk("user/newUser", async (user) => {
  const response = await userService.newUser(user);
  return response.data.user;
});

const userSlice = createSlice({
  name: "auth",
  initialState: {
    isLoading: false,
    userList: [],

    isSuccessNew: false,
    userNew: {},

    userProfile: {},
  },
  reducers: {
    resetNewUser(state) {
      state.NewUser = {};
    },
  },
  extraReducers: {
    [getListUser.pending]: (state) => {
      state.isLoading = true;
    },
    [getListUser.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.userList = action.payload;
    },
    [newUser.pending]: (state) => {
      state.isSuccessNew = false;
    },
    [newUser.fulfilled]: (state, action) => {
      state.userNew = action.payload;
    },
    [getAUser.pending]: (state) => {
      state.isLoading = true;
    },
    [getAUser.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.userProfile = action.payload;
    },
  },
});
export const { resetNewUser } = userSlice.actions;
export default userSlice.reducer;
