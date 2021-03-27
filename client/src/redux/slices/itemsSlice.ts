import { createSlice } from "@reduxjs/toolkit";
import {
  createItem,
  getItems,
  updateItem,
  deleteItem,
} from "../thunkActions/itemsThunkActions";
import { Item } from "../../dataTypes";

type SliceState = { items: Item[] };

const initialState: SliceState = {
  items: [],
};

const itemsSlice = createSlice({
  name: "items",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(createItem.fulfilled, (state, action) => {
      state.items = [...state.items, action.payload];
    });
    builder.addCase(getItems.fulfilled, (state, action) => {
      state.items = action.payload;
    });

    builder.addCase(getItems.rejected, (state, action) => {
      state.items = [];
    });

    builder.addCase(updateItem.fulfilled, (state, action) => {
      state.items = state.items.map((i) =>
        i._id === action.payload._id ? action.payload : i
      );
    });
    builder.addCase(deleteItem.fulfilled, (state, action) => {
      state.items = state.items.filter((i) => i._id !== action.payload._id);
    });
  },
});

const { reducer } = itemsSlice;
export default reducer;
