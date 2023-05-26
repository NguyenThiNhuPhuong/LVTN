import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import * as userService from "../../../services/userService";
//GET LIST USER
export const getListUser = createAsyncThunk("user/getListUser", async () => {
  const response = await userService.getListUser();
  return response.rows;
});
//GET A USER
export const getAUser = createAsyncThunk("user/getAUser", async (id) => {
  const response = await userService.getAUser(id);
  return response.user;
});
//NEW USER
export const newUser = createAsyncThunk("user/newUser", async (user) => {
  const response = await userService.newUser(user);
  return response.data.user;
});
//UPDATE USER
export const updateUser = createAsyncThunk("user/updateUser", async (user) => {
  const response = await userService.updateUser(user);
  return response.data.user;
});
//GET PROFILE USER
export const getUserProfile = createAsyncThunk(
  "user/getUserProfile",
  async () => {
    const response = await userService.getUserProfile();
    return response.user;
  }
);
const userSlice = createSlice({
  name: "auth",
  initialState: {
    isLoading: false,
    userList: [],

    userNew: {},

    userUpdate: {},

    userProfile: {},

    singleUser: {},
  },
  reducers: {
    resetNewUser(state) {
      state.userNew = {};
    },
    setUpdateUser(state, action) {
      state.singleUser = action.payload;
    },
    resetUpdateUser(state) {
      state.userUpdate = {};
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
      state.isLoading = false;
    },
    [newUser.fulfilled]: (state, action) => {
      state.userNew = action.payload;
    },
    [updateUser.pending]: (state) => {
      state.isLoading = false;
    },
    [updateUser.fulfilled]: (state, action) => {
      state.userUpdate = action.payload;
    },
    [getAUser.pending]: (state) => {
      state.isLoading = true;
    },
    [getAUser.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.singleUser = action.payload;
    },
    [getUserProfile.pending]: (state) => {
      state.isLoading = true;
    },
    [getUserProfile.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.userProfile = action.payload;
    },
  },
});
export const { resetNewUser, setUpdateUser, resetUpdateUser } =
  userSlice.actions;
export default userSlice.reducer;
