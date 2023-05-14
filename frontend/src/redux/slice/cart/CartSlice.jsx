import { createSlice } from "@reduxjs/toolkit";
import Swal from "sweetalert2";

const listCartFromLocalStorage = localStorage.getItem("cart")
  ? JSON.parse(localStorage.getItem("cart"))
  : [];
console.log("listCartFromLocalStorage", listCartFromLocalStorage);
const cartSlice = createSlice({
  name: "cart",
  initialState: {
    listCart: listCartFromLocalStorage,
    priceCart: 0,
    priceAllCart: 0,
    priceShip: 30000,
    product: {},
  },
  reducers: {
    addCart: (state, action) => {
      const indexCart = state.listCart?.findIndex(
        (val) => val?.product_id === action.payload?.id
      );
      const product = action.payload;
      if (indexCart === -1) {
        state.listCart.push({
          ...product,
          product_id: product.id,
          cartNum: 1,
        });
        localStorage.setItem("cart", JSON.stringify(state.listCart));
        Swal.fire(
          "Thank You!",
          "Sản phẩm đã được thêm vào giỏ hàng!",
          "success"
        );
      } else {
        if (state.listCart[indexCart].num_current > 0) {
          const num = product.cartNum ? product.cartNum : 1;
          state.listCart[indexCart].cartNum += num;
          localStorage.setItem("cart", JSON.stringify(state.listCart));
        } else {
          Swal.fire(
            "The Internet?",
            "Rất tiếc sản phẩm để hết số lượng",
            "question"
          );
        }
      }
    },
    removeCart: (state, action) => {
      const removeCart = action.payload;
      const removedIndex = state.listCart.findIndex(
        (cart) => cart.product_id === removeCart.product_id
      );
      if (removedIndex !== -1) {
        state.listCart.splice(removedIndex, 1);
        localStorage.setItem("cart", JSON.stringify(state.listCart));
      }
    },

    increaseCart: (state, action) => {
      const indexCart = state.listCart?.findIndex(
        (val) => val.product_id === action.payload?.product_id
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
        (val) => val.product_id === action.payload?.product_id
      );
      state.listCart[indexCart]?.cartNum > 0
        ? state.listCart[indexCart].cartNum-- &&
          localStorage.setItem("cart", JSON.stringify(state.listCart))
        : state.listCart.filter(
            (cart) => cart.product_id !== action.payload.product_id
          );
    },

    totalCart(state, action) {
      state.priceCart = action.payload;
    },
    totalAllCart(state, action) {
      state.priceAllCart = action.payload;
    },
  },
});

export default cartSlice.reducer;
export const {
  addCart,
  removeCart,
  increaseCart,
  decreaseCart,

  totalCart,
  totalAllCart,
} = cartSlice.actions;
