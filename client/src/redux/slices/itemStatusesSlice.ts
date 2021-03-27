import {
  getCompleteItems,
  getIncompleteItems,
} from "../thunkActions/itemStatusesThunkActions";

import {
  createItem,
  deleteItem,
  updateItem,
} from "../thunkActions/itemsThunkActions";

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
    builder.addCase(createItem.fulfilled, (state, action) => {
      if (action.payload.Complete) {
        state.completeItems = [...state.completeItems, action.payload];
      } else {
        state.incompleteItems = [...state.incompleteItems, action.payload];
      }
    });
    builder.addCase(createItem.rejected, (state, action) => {
      state.completeItems = state.completeItems;
      state.incompleteItems = state.incompleteItems;
    });

    builder.addCase(updateItem.fulfilled, (state, action) => {
      const previouslyIncompleteItem = state.incompleteItems.find(
        (item) => item._id === action.payload._id
      );

      if (action.payload.Complete) {
        if (previouslyIncompleteItem) {
          state.completeItems = [...state.completeItems, action.payload];
          state.incompleteItems = state.incompleteItems.filter(
            (item) => item._id != action.payload._id
          );
        } else {
          state.completeItems = state.completeItems.map((i) =>
            i._id === action.payload._id ? action.payload : i
          );
        }
      } else {
        if (previouslyIncompleteItem) {
          state.incompleteItems = state.incompleteItems.map((i) =>
            i._id === action.payload._id ? action.payload : i
          );
        } else {
          state.incompleteItems = [...state.incompleteItems, action.payload];
          state.completeItems = state.completeItems.filter(
            (item) => item._id != action.payload._id
          );
        }
      }
    });

    builder.addCase(updateItem.rejected, (state, action) => {
      state.completeItems = state.completeItems;
      state.incompleteItems = state.incompleteItems;
    });

    builder.addCase(deleteItem.fulfilled, (state, action) => {
      if (action.payload.Complete) {
        state.completeItems = state.completeItems.filter(
          (i) => i._id !== action.payload._id
        );
      } else {
        state.incompleteItems = state.incompleteItems.filter(
          (i) => i._id !== action.payload._id
        );
      }
    });

    builder.addCase(deleteItem.rejected, (state, action) => {
      state.completeItems = state.completeItems;
      state.incompleteItems = state.incompleteItems;
    });
  },
});

const { reducer } = itemStatusesSlice;
export default reducer;
export const { setFilteredStatus } = itemStatusesSlice.actions;
