import { configureStore } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";

import rootReducer from "./rootReducer";

const store = configureStore({
  reducer: rootReducer,
});

export default store;
