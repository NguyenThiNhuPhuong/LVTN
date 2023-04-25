import productReducer from "./product/ProductSlice";
import categoryReducer from "./category/CategorySlice";
import authReducer from "./auth/AuthSlice";
import sliderReducer from "./slider/SliderSlice";
import cartReducer from "./cart/CartSlice";
import discountReducer from "./discount/DiscountSlice";
import filesReducer from "./file/FileSlice";
import addressReducer from "./address/AddressSlice";
import orderReducer from "./order/OrderSlice";
import userReducer from "./user/UserSlice";

import { combineReducers } from "@reduxjs/toolkit";

const rootReducer = combineReducers({
  product: productReducer,
  cart: cartReducer,
  category: categoryReducer,
  auth: authReducer,
  user: userReducer,
  slider: sliderReducer,
  discount: discountReducer,
  file: filesReducer,
  address: addressReducer,
  order: orderReducer,
});

export { rootReducer };
