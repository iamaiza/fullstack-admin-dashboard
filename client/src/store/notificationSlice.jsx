import { createSlice } from "@reduxjs/toolkit";

const notificationSlice = createSlice({
  name: "notification",
  initialState: {
    message: "",
    error: false,
    type: "success"
  },
  reducers: {
    setMessage: (state, action) => {
      const { message } = action.payload;
      state.message = message;
    },
    setType: (state, action) => {
        const { type } = action.payload;
        state.type = type;
    },
    showNotification: (state) => {
        state.error = true;
    },
    hideNotification: (state) => {
        state.error = false
        state.message = ""
    },
    closeNotification: (state) => {
      state.error = false;
      state.message = "";
    },
  },
});

export const { setMessage, showNotification, hideNotification, closeNotification, setType } = notificationSlice.actions;
export default notificationSlice.reducer;