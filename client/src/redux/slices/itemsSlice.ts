import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import { CreateItemData, Item } from "../../dataTypes";
import API from "../../api";

type SliceState = { items: Item[] };

const initialState: SliceState = {
  items: [],
};

export const createItem = createAsyncThunk(
  "items/createItem",
  async (payload: CreateItemData) => {
    const item = await API.createItem(payload);
    return item;
  }
);

export const getItems = createAsyncThunk("items/listItems", async () => {
  const items = await API.getItems();
  return items;
});

export const updateItem = createAsyncThunk(
  "items/updateItem",
  async (payload: Item) => {
    const item = await API.updateItem(payload);
    return item;
  }
);

export const deleteItem = createAsyncThunk(
  "items/deleteItem",
  async (payload: number) => {
    await API.deleteItem(payload);
    return payload;
  }
);

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
      state.items = state.items.filter((i) => i._id !== action.payload);
    });
  },
});

const { reducer } = itemsSlice;
export default reducer;
