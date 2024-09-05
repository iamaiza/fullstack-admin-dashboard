import { createSlice } from "@reduxjs/toolkit";

const productSlice = createSlice({
  name: "product",
  initialState: {
    title: "",
    quantity: "",
    purchase_price: "",
    sell_price: "",
    supplier: "",
    search: "",
    img: ""
  },
  reducers: {
    changeEventHandler: (state, action) => {
        const { name, value } = action.payload;
        state[name] = value;
    },
    clearStateHandler: (state) => {
        state.title = "";
        state.quantity = "";
        state.img = "";
        state.purchase_price = "";
        state.sell_price = "";
        state.supplier = "";
    },
    setProductData: (state, action) => {
      const { title, quantity, purchase_price, img, sell_price, supplier_id } = action.payload;
      state.title = title;
      state.img = img
      state.quantity = quantity;
      state.purchase_price = purchase_price;
      state.sell_price = sell_price;
      state.supplier = supplier_id;
    },
    setImg: (state, action) => {
      const { imgUrl } = action.payload;
      state.img = imgUrl;
    }
  }
});

export const { changeEventHandler, clearStateHandler, setProductData, setImg } = productSlice.actions;
export default productSlice.reducer;