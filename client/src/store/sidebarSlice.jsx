import {createSlice} from "@reduxjs/toolkit";

const sidebarSlice = createSlice({
  name: "sidebar",
  initialState: {
    isOpen: false,
  },
  reducers: {
    toggleSidebarHandler: (state) => {
      state.isOpen = !state.isOpen;
    },
    
    closeSidebarHandler: (state) => {
      state.isOpen = false;
    },
    // openSidebarHandler: (state) => {
    //   state.isOpen = true;
    // },
  },
});

export const { toggleSidebarHandler, closeSidebarHandler } =
  sidebarSlice.actions;
export default sidebarSlice.reducer;
