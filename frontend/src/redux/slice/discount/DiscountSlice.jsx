import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import * as discountService from "../../../services/discountService";
//GET LIST DISCOUNT
export const getDiscounts = createAsyncThunk(
  "discount/getDiscounts",
  async (params) => {
    const response = await discountService.getDiscount(params);
    return response;
  }
);
//GET LIST DISCOUNT BY DATE FOR USER
export const getListDiscountByDate = createAsyncThunk(
  "discount/getListDiscountByDate",
  async (date) => {
    const response = await discountService.getListDiscountByDate(date);
    return response.data.data;
  }
);
//API GET A DISCOUNT
export const getADiscount = createAsyncThunk(
  "Discount/getADiscount",
  async (id) => {
    const response = await discountService.getADiscount(id);
    return response.discount;
  }
);
// API CREATE NEW DISCOUNT
export const newDiscount = createAsyncThunk(
  "Discount/newDiscount",
  async (DiscountNew) => {
    const response = await discountService.newDiscount(DiscountNew);
    return response.data.discount;
  }
);
//API UPDATE DISCOUNT
export const updateDiscount = createAsyncThunk(
  "Discount/updateDiscount",
  async (DiscountUpdate) => {
    const response = await discountService.updateDiscount(DiscountUpdate);
    return response.data.discount;
  }
);
//API REMOVE DISCOUNT
export const removeDiscount = createAsyncThunk(
  "Discount/removeDiscount",
  async (id) => {
    const response = await discountService.removeDiscount(id);
    return response.data.message;
  }
);
//CHECK DISCOUNT BY DATE AND MONEY FOR USER
export const checkDiscount = createAsyncThunk(
  "discount/checkDiscount",
  async (discount) => {
    const response = await discountService.getDiscountByCode(discount);
    return response.discount;
  }
);
//CHECK DISCOUNT BY DATE AND TIME AND MONEY FOR USER
export const listDiscountValid = createAsyncThunk(
  "discount/listDiscountValid",
  async (discount) => {
    const response = await discountService.listDiscountValid(discount);
    return response.data.data;
  }
);
const discountSlice = createSlice({
  name: "discount",
  initialState: {
    discountList: [],
    ListDiscountByDate: [],
    ListDiscountValid: [],

    isLoading: false,
    code: "",
    codeName: "",
    discount: 0,
    discountSingle: {},
    discountNew: {},
    discountUpdate: {},
    alertDeleteSuccess: "",

    currentPage: 0,
    totalPages: 0,
    params: {
      page: "",
      per_page: "",
      active: "",
    },
  },
  reducers: {
    setCode(state, action) {
      state.code = action.payload;
      state.discount = 0;
    },
    setUpdateDiscount(state, action) {
      state.discountSingle = action.payload;
    },
    setParams(state, action) {
      state.params = action.payload;
    },
    resetNewDiscount: (state) => {
      state.discountNew = {};
    },
    resetADiscount: (state) => {
      state.discountSingle = {};
    },

    resetRemoveDiscount: (state) => {
      state.alertDeleteSuccess = "";
    },
  },
  extraReducers: {
    [getDiscounts.pending]: (state) => {
      state.isLoading = true;
    },
    [getDiscounts.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.discountList = action.payload.data.data;
      state.currentPage = action.payload.currentPage;
      state.totalPages = action.payload.totalPages;
    },
    [getListDiscountByDate.pending]: (state) => {
      state.isLoading = true;
    },
    [getListDiscountByDate.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.ListDiscountByDate = action.payload;
    },
    [checkDiscount.pending]: (state) => {
      state.isLoading = true;
    },
    [checkDiscount.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.discount = action.payload.discount;
      state.codeName = action.payload.code;
    },
    [listDiscountValid.pending]: (state) => {
      state.isLoading = true;
    },
    [listDiscountValid.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.ListDiscountValid = action.payload;
    },
    [getADiscount.pending]: (state) => {
      state.isLoading = true;
    },
    [getADiscount.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.discountSingle = action.payload;
    },
    [newDiscount.pending]: (state) => {
      state.isSuccessNew = false;
    },
    [newDiscount.fulfilled]: (state, action) => {
      state.discountNew = action.payload;
    },
    [updateDiscount.pending]: (state) => {
      state.isLoading = true;
    },
    [updateDiscount.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.discountUpdate = action.payload;
    },

    [removeDiscount.pending]: (state) => {
      state.isLoading = true;
    },
    [removeDiscount.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.alertDeleteSuccess = action.payload;
    },
  },
});
export const {
  setCode,
  setUpdateDiscount,
  setParams,
  resetNewDiscount,
  resetADiscount,
  resetRemoveDiscount,
} = discountSlice.actions;
export default discountSlice.reducer;
//
