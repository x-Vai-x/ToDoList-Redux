import React, { useEffect } from "react";
import { useDispatch, shallowEqual } from "react-redux";

import ItemDialog from "../components/dialogs/ItemDialog";
import ItemDetail from "../components/partials/ItemDetail";
import { Item } from "../dataTypes";

import { getItems } from "../redux/thunkActions/itemsThunkActions";
import {
  getCompleteItems,
  getIncompleteItems,
} from "../redux/thunkActions/itemStatusesThunkActions";

import { useSelector } from "../redux/rootReducer";
import CompleteFilterDropdown from "../components/partials/CompleteFilterDropdown";

export default function ItemsPage() {
  const dispatch = useDispatch();
  const { items } = useSelector((state) => state.items, shallowEqual);
  const { completeItems, incompleteItems, filterStatus } = useSelector(
    (state) => state.itemStatuses,
    shallowEqual
  );

  useEffect(() => {
    dispatch(getIncompleteItems());
    dispatch(getCompleteItems());
    dispatch(getItems());
  }),
    [];

  function getVisibleItems() {
    switch (filterStatus) {
      case 0:
        return incompleteItems ?? [];

      case 1:
        return completeItems ?? [];

      case 2:
        return items ?? [];

      default:
        return items ?? [];
    }
  }

  return (
    <>
      <CompleteFilterDropdown />
      <h1>Items</h1>
      <ItemDialog />

      {getVisibleItems().map((i: Item) => (
        <ItemDetail item={i} />
      ))}
    </>
  );
}
