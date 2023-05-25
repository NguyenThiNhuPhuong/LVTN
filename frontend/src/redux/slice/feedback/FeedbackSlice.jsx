import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import * as feedbackService from "../../../services/feedbackService";
//GET LIST FEEDBACK
export const getListFeedback = createAsyncThunk(
  "Feedback/getListFeedback",
  async (params) => {
    const response = await feedbackService.getFeedback(params);
    console.log(response);
    return response;
  }
);
// API CREATE NEW FEEDBACK
export const newFeedback = createAsyncThunk(
  "Feedback/newFeedback",
  async (feedback) => {
    const response = await feedbackService.postFeedback(feedback);
    console.log(response);
    return response.data.feedback;
  }
);

const feedbackSlice = createSlice({
  name: "feedback",
  initialState: {
    ListFeedback: [],
    feedbackNew: {},
    params: {
      page: "",
      per_page: "",
    },
    currentPage: 0,
    totalPages: 0,
  },
  reducers: {
    setParams(state, action) {
      state.params = action.payload;
    },
  },
  extraReducers: {
    [getListFeedback.pending]: (state) => {
      state.isLoading = true;
    },
    [getListFeedback.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.ListFeedback = action.payload.data.data;
      state.currentPage = action.payload.currentPage;
      state.totalPages = action.payload.totalPages;
    },

    [newFeedback.pending]: (state) => {
      state.isLoading = true;
    },
    [newFeedback.fulfilled]: (state, action) => {
      state.feedbackNew = action.payload;
    },
  },
});
export const { setParams } = feedbackSlice.actions;
export default feedbackSlice.reducer;
//
