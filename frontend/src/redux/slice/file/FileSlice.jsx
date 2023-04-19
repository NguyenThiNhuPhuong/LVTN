import { createSlice } from "@reduxjs/toolkit";

const filesSlice = createSlice({
  name: "files",
  initialState: {
    fileList: [],
  },
  reducers: {
    addFile: (state, action) => {
      state.fileList.push(action.payload);
    },
    removeFile: (state, action) => {
      state.fileList.splice(action.payload, 1);
    },
    clearFiles: (state) => {
      state.fileList = [];
    },
  },
});

export const { addFile, removeFile, clearFiles } = filesSlice.actions;
export default filesSlice.reducer;
