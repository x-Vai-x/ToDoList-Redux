import { combineReducers } from "redux";

import itemsReducer from "./slices/itemsSlice";
import itemStatusesReducer from "./slices/itemStatusesSlice";

const rootReducer = combineReducers({
  items: itemsReducer,
  itemStatuses: itemStatusesReducer,
});

export default rootReducer;
