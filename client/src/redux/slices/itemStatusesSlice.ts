import {
  getCompleteItems,
  getIncompleteItems,
} from "../thunkActions/itemStatusesThunkActions";

import { createSlice } from "@reduxjs/toolkit";
import { Item } from "../../dataTypes";

type SliceState = {
  completeItems: Item[];
  incompleteItems: Item[];
  filterStatus: number;
};

const initialState: SliceState = {
  completeItems: [],
  incompleteItems: [],
  filterStatus: 2,
};

const itemStatusesSlice = createSlice({
  name: "item_statuses",
  initialState,
  reducers: {
    setFilteredStatus(state, action) {
      state.filterStatus = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getCompleteItems.fulfilled, (state, action) => {
      state.completeItems = action.payload;
    });
    builder.addCase(getIncompleteItems.fulfilled, (state, action) => {
      state.incompleteItems = action.payload;
    });
    builder.addCase(getCompleteItems.rejected, (state, action) => {
      state.completeItems = [];
    });
    builder.addCase(getIncompleteItems.rejected, (state, action) => {
      state.incompleteItems = [];
    });
  },
});

const { reducer } = itemStatusesSlice;
export default reducer;
export const { setFilteredStatus } = itemStatusesSlice.actions;
