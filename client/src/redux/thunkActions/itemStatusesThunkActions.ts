import { createAsyncThunk } from "@reduxjs/toolkit";
import API from "../../api";

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
