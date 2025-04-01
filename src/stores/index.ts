import { configureStore } from "@reduxjs/toolkit";
import root from "@/reducers";

const store = configureStore({
  reducer: root,
});

export default store;
