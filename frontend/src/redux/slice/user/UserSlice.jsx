import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import * as userService from "../../../services/userService";

export const getAUser = createAsyncThunk("user/getAUser", async (user) => {
  try {
    const response = await userService.getAUser();
    console.log("response", response);
    return response.user;
  } catch (e) {
    console.log(e);
  }
});

const userSlice = createSlice({
  name: "auth",
  initialState: {
    userProfile: {},
    isLoading: false,
  },
  reducers: {},
  extraReducers: {
    [getAUser.pending]: (state) => {
      state.isLoading = true;
    },
    [getAUser.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.userProfile = action.payload;
    },
  },
});

export default userSlice.reducer;
