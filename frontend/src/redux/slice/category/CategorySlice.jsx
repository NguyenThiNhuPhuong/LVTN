import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import * as categoryService from "../../../services/categoryService";
//API GET LISTCATEGORY
export const getCategory = createAsyncThunk(
  "category/getCategory",
  async () => {
    const response = await categoryService.getListCategory();
    return response.rows;
  }
);
//API GET A CATEGORY
export const getACategory = createAsyncThunk(
  "category/getACategory",
  async (id) => {
    const response = await categoryService.getACategory(id);
    return response.category;
  }
);
// API CREATE NEW CATEGORY
export const newCategory = createAsyncThunk(
  "category/newCategory",
  async (categoryNew) => {
    const response = await categoryService.newCategory(categoryNew);
    return response.data.category;
  }
);
//API UPDATE CATEGORY
export const updateCategory = createAsyncThunk(
  "category/updateCategory",
  async (categoryUpdate) => {
    const response = await categoryService.updateCategory(categoryUpdate);
    return response.category;
  }
);
//API REMOVE CATEGORY
export const removeCategory = createAsyncThunk(
  "category/removeCategory",
  async (id) => {
    const response = await categoryService.removeCategory(id);
    return response.data.message;
  }
);

const categorySlice = createSlice({
  name: "category",
  initialState: {
    categoryList: [],
    isLoading: false,

    categorySingle: {},
    isSuccessSingle: false,

    categoryUpdate: {},
    isLoadingUpdate: false,

    categoryNew: {},
    isSuccessNew: false,

    isLoadingRemove: false,
    alertDeleteSuccess: "",
  },
  reducers: {
    setSingleCategory(state, action) {
      state.categorySingle = action.payload;
    },
    resetNewCategory: (state) => {
      state.categoryNew = {};
    },
    resetACategory: (state) => {
      state.categorySingle = {};
    },
    resetUpdateCategory: (state) => {
      state.categoryUpdate = {};
    },
    resetRemoveCategory: (state) => {
      state.alertDeleteSuccess = "";
    },
  },
  extraReducers: {
    [getCategory.pending]: (state) => {
      state.isLoading = true;
    },
    [getCategory.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.categoryList = action.payload;
    },

    [getACategory.pending]: (state) => {
      state.isLoading = true;
      state.categorySingle = {};
    },
    [getACategory.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.categorySingle = action.payload;
    },

    [newCategory.pending]: (state) => {
      state.isSuccessNew = false;
    },
    [newCategory.fulfilled]: (state, action) => {
      state.categoryNew = action.payload;
    },

    [updateCategory.pending]: (state) => {
      state.isLoadingUpdate = true;
    },
    [updateCategory.fulfilled]: (state, action) => {
      state.isLoadingUpdate = false;
      state.categoryUpdate = action.payload;
    },

    [removeCategory.pending]: (state) => {
      state.isLoadingRemove = true;
    },
    [removeCategory.fulfilled]: (state, action) => {
      state.isLoadingRemove = false;
      state.alertDeleteSuccess = action.payload;
    },
  },
});

export default categorySlice.reducer;
export const {
  resetNewCategory,
  resetACategory,
  resetUpdateCategory,
  resetRemoveCategory,
  setSingleCategory,
} = categorySlice.actions;
