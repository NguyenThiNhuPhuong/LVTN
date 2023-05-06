import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import * as discountService from "../../../services/discountService";
//GET LIST DISCOUNT
export const getDiscounts = createAsyncThunk(
  "discount/getDiscounts",
  async () => {
    const response = await discountService.getDiscount();
    console.log("response", response);
    return response.rows;
  }
);
//GET LIST DISCOUNT BY DATE FOR USER
export const getListDiscountByDate = createAsyncThunk(
  "discount/getListDiscountByDate",
  async (date) => {
    const response = await discountService.getListDiscountByDate(date);
    return response.rows;
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
    return response.discount;
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
const discountSlice = createSlice({
  name: "discount",
  initialState: {
    discountList: [],
    ListDiscountByDate: [],
    isLoading: false,
    code: "",
    codeName: "",
    discount: 0,
    discountSingle: {},
    discountNew: {},

    isLoadingRemove: false,
    alertDeleteSuccess: "",
  },
  reducers: {
    setCode(state, action) {
      state.code = action.payload;
    },
    setSingleDiscount(state, action) {
      state.discountSingle = action.payload;
    },
    resetNewDiscount: (state) => {
      state.discountNew = {};
    },
    resetADiscount: (state) => {
      state.discountSingle = {};
    },
    resetUpdateDiscount: (state) => {
      state.discountUpdate = {};
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
      state.discountList = action.payload;
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
    [getADiscount.pending]: (state) => {
      state.isLoading = true;
      state.discountSingle = {};
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
      state.isLoadingUpdate = true;
    },
    [updateDiscount.fulfilled]: (state, action) => {
      state.isLoadingUpdate = false;
      state.discountUpdate = action.payload;
    },

    [removeDiscount.pending]: (state) => {
      state.isLoadingRemove = true;
    },
    [removeDiscount.fulfilled]: (state, action) => {
      state.isLoadingRemove = false;
      state.alertDeleteSuccess = action.payload;
    },
  },
});
export const {
  setCode,
  setSingleDiscount,
  resetNewDiscount,
  resetADiscount,
  resetUpdateDiscount,
  resetRemoveDiscount,
} = discountSlice.actions;
export default discountSlice.reducer;
//
