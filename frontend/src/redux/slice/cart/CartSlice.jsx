import { createSlice } from "@reduxjs/toolkit";
import Swal from "sweetalert2";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    listCart: localStorage.getItem("cart")
      ? JSON.parse(localStorage.getItem("cart"))
      : [],
  },
  reducers: {
    addCart: (state, action) => {
      const indexCart = state.listCart?.findIndex(
        (val) => val?._id === action.payload?._id
      );
      if (indexCart === -1) {
        state.listCart.push({ ...action.payload, cartNum: 1 });
        localStorage.setItem("cart", JSON.stringify(state.listCart));
        Swal.fire(
          "Thank You!",
          "Sản phẩm đã được thêm vào giỏ hàng!",
          "success"
        );
      } else {
        state.listCart[indexCart].cartNum < state.listCart[indexCart].num
          ? state.listCart[indexCart].cartNum++ &&
            localStorage.setItem("cart", JSON.stringify(state.listCart))
          : Swal.fire(
              "The Internet?",
              "Rất tiếc sản phẩm để hết số lượng",
              "question"
            );
      }
    },
    removeCart: (state, action) => {
      const removeCart = action.payload;
      //   const newCart = state.listCart.filter(
      //     (cart) => cart._id !== removeCart._id
      //   );
      state.listCart.filter((cart) => cart._id !== removeCart._id) &&
        localStorage.setItem("cart", JSON.stringify(state.listCart));
    },
    increaseCart: (state, action) => {
      const indexCart = state.listCart?.findIndex(
        (val) => val._id === action.payload?._id
      );
      state.listCart[indexCart]?.cartNum < state.listCart[indexCart]?.num
        ? state.listCart[indexCart].cartNum++ &&
          localStorage.setItem("cart", JSON.stringify(state.listCart))
        : Swal.fire(
            "The Internet?",
            `Rất tiếc sản phẩm chỉ còn ${state.listCart[indexCart].cartNum} cái `,
            "question"
          );
    },
    decreaseCart: (state, action) => {
      const indexCart = state.listCart?.findIndex(
        (val) => val._id === action.payload?._id
      );
      state.listCart[indexCart]?.cartNum > 0
        ? state.listCart[indexCart].cartNum-- &&
          localStorage.setItem("cart", JSON.stringify(state.listCart))
        : state.listCart.filter((cart) => cart._id !== action.payload._id);
    },
  },
});

export default cartSlice.reducer;
export const { addCart, removeCart, increaseCart, decreaseCart } =
  cartSlice.actions;
