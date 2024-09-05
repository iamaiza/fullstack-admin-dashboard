import { createSlice } from "@reduxjs/toolkit";

const supplierSlice = createSlice({
    name: "supplier",
    initialState: {
        username: "",
        address: "",
        phone: "",
        search: ""
    },
    reducers: {
        changeEventHandler: (state, action) => {
            const { name, value } = action.payload;
            state[name] = value;
        },
        clearStateHandler: (state) => {
            state.username = "";
            state.address = "";
            state.phone = "";
        },
        setSupplierData: (state, action) => {
            const { name, address, phone } = action.payload;
            state.username = name;
            state.address = address;
            state.phone = phone;
        }
    }
})

export const { changeEventHandler, clearStateHandler, setSupplierData } = supplierSlice.actions;
export default supplierSlice.reducer;