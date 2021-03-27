import { createAsyncThunk } from "@reduxjs/toolkit";
import { CreateItemData, Item } from "../../dataTypes";
import API from "../../api";

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
  async (payload: Item) => {
    await API.deleteItem(payload);
    return payload;
  }
);
