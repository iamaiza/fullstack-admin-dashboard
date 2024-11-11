import { createSlice } from "@reduxjs/toolkit";
import Cookies from "js-cookie";

const orderSlice = createSlice({
  name: "order",
  initialState: {
    // quantity: Cookies.get("cart")
    //   ? JSON.parse(Cookies.get("cart"))?.quantity
    //   : 0,
    quantity: 0,
    // cart: Cookies.get("cart") ? JSON.parse(Cookies.get("cart"))?.cart : [],
    cart: [],
    // total_price: Cookies.get("cart")
    //   ? JSON.parse(Cookies.get("cart"))?.total_price
    //   : 0,
    total_price: 0,
    search: "",
    shop: false,
  },
  reducers: {
    setOrder: (state, action) => {
      const { quantity, product } = action.payload;
      const existingProduct = state.cart.find((item) => item.id === product.id); 
      console.log(existingProduct);
      
      if (existingProduct) {
        existingProduct.quantity = parseInt(existingProduct.quantity) + quantity;
      } else {
        state.cart.push({ ...product, quantity });
      }
      state.quantity = parseInt(state.quantity) + quantity;
      state.total_price = state.cart.reduce(
        (acc, item) => acc + parseInt(item.sell_price) * parseInt(item.quantity),
        0
      );
      // Cookies.set(
      //   "cart",
      //   JSON.stringify({
      //     cart: state.cart,
      //     quantity: state.quantity,
      //     total_price: state.total_price,
      //   })
      // );
    },
    deleteFromCart: (state, action) => {
      const { id } = action.payload;
      const existingProduct = state.cart.find((item) => item.id === id);
      if (existingProduct) {
        if (existingProduct.quantity > 1) {
          existingProduct.quantity = parseInt(existingProduct.quantity) - 1;
        } else {
          state.cart = state.cart.filter((item) => item.id !== id);
        }
      }
      state.quantity -= 1;
      state.total_price = state.cart.reduce(
        (acc, item) => acc + parseInt(item.sell_price) * parseInt(item.quantity),
        0
      );
      // Cookies.set(
      //   "cart",
      //   JSON.stringify({
      //     cart: state.cart,
      //     quantity: state.quantity,
      //     total_price: state.total_price,
      //   })
      // );
    },
    clearCart: (state) => {
      state.cart = [];
      state.quantity = 0;
      state.total_price = 0;
    },
    showList: (state) => {
      state.shop = true;
    },
    hideList: (state) => {
      state.shop = false;
    },
    toggleList: (state) => {
      state.shop = !state.shop
    },
    setValues: (state, action) => {
      const { products, totalQuantity, totalPrice } = action.payload;
      state.cart = products;
      state.quantity = totalQuantity;
      state.total_price = totalPrice;
    },
    setSearch: (state, action) => {
      state.search = action.payload
    },
    clearSearch: (state) => {
      state.search = ""
    },
    updateOrder: (state, action) => {
      const { itemId, payload, quantity } = action.payload;
      const existingProduct = state.cart.find(
        (item) => item.id === itemId
      );

      if (existingProduct) {
        if (payload === "INC") {
          existingProduct.quantity =
            parseInt(existingProduct.quantity) + quantity;
        } else if (payload === "DEC") {
          existingProduct.quantity =
            parseInt(existingProduct.quantity) - quantity;

          if (existingProduct.quantity <= 0) {
            state.cart = state.cart?.filter(
              (item) => item.id !== itemId
            );
          }
        }
      }
      state.quantity = state.cart?.reduce(
        (acc, item) => acc + parseInt(item.quantity),
        0
      );
      state.total_price = state.cart?.reduce(
        (acc, item) =>
          acc +
          parseInt(item.sell_price) *
            parseInt(item.quantity),
        0
      );

      // Cookies.set(
      //   "update-cart",
      //   JSON.stringify({
      //     cart: state.cart,
      //     quantity: state.quantity,
      //     price: state.total_price,
      //   })
      // );
    },
  },
});

export const {
  setOrder,
  showList,
  hideList,
  deleteFromCart,
  clearCart,
  updateOrder,
  setValues,
  setSearch,
  toggleList,
  clearSearch
  // updateSetOrderValues,
} = orderSlice.actions;
export default orderSlice.reducer;
