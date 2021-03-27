import { combineReducers } from "redux";
import { createSelectorHook } from "react-redux";

import itemsReducer from "./slices/itemsSlice";
import itemStatusesReducer from "./slices/itemStatusesSlice";

const rootReducer = combineReducers({
  items: itemsReducer,
  itemStatuses: itemStatusesReducer,
});

export default rootReducer;

export type RootState = ReturnType<typeof rootReducer>;
export const useSelector = createSelectorHook<RootState>();
