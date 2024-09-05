import { createSlice } from "@reduxjs/toolkit";

const orderSlice = createSlice({
    name: "order",
    initialState: {
        quantity: "",
        product: "",
        search: ""
    },
    reducers: {
        changeEventHandler: (state, action) => {
            const { name, value } = action.payload;
            state[name] = value;
        },
        clearStateHandler: (state) => {
            state.product = "";
            state.quantity = "";
        },
        setOrderData: (state, action) => {
            const { quantity, product_id } = action.payload;
            state.quantity = quantity;
            state.product = product_id;
        }
    }
})

export const { changeEventHandler, clearStateHandler, setOrderData } = orderSlice.actions;
export default orderSlice.reducer;