import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import { Item } from "../../dataTypes";
import API from "../../api";

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

export const getIncompleteItems = createAsyncThunk(
  "items/listItems/incomplete",
  async () => {
    const items = await API.getItems(0);
    return items;
  }
);

export const getCompleteItems = createAsyncThunk(
  "items/listItems/complete",
  async () => {
    const items = await API.getItems(1);
    return items;
  }
);

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
  },
});

const { reducer } = itemStatusesSlice;
export default reducer;
export const { setFilteredStatus } = itemStatusesSlice.actions;
