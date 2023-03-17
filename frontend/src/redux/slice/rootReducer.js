import productReducer from "./product/ProductSlice";
import categoryReducer from "./category/CategorySlice";
import authReducer from "./auth/AuthSlice";
import sliderReducer from "./slider/SliderSlice";
import cartReducer from "./cart/CartSlice";
import discountReducer from "./discount/DiscountSlice";

import { combineReducers } from "@reduxjs/toolkit";

const rootReducer = combineReducers({
  product: productReducer,
  cart: cartReducer,
  category: categoryReducer,
  auth: authReducer,
  slider: sliderReducer,
  discount: discountReducer,
});

export { rootReducer };
