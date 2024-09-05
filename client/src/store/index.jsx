import { configureStore } from "@reduxjs/toolkit";
import sidebarSliceReducer from "./sidebarSlice";
import supplierSliceReducer from "./supplierSlice";
import productSliceReducer from "./productSlice";
import orderSliceReducer from "./orderSlice";
import notificationSliceReducer from "./notificationSlice";

const store = configureStore({
  reducer: {
    sidebar: sidebarSliceReducer,
    supplier: supplierSliceReducer,
    product: productSliceReducer,
    order: orderSliceReducer,
    notification: notificationSliceReducer,
  },
});

export default store;
