import React from "react";
import { useDispatch, shallowEqual } from "react-redux";

import ItemDialog from "../components/dialogs/ItemDialog";
import ItemDetail from "../components/partials/ItemDetail";
import { Item } from "../dataTypes";

import { getItems } from "../redux/slices/itemsSlice";
import {
  getCompleteItems,
  getIncompleteItems,
} from "../redux/slices/itemStatusesSlice";

import { useSelector } from "../redux/rootReducer";
import CompleteFilterDropdown from "../components/partials/CompleteFilterDropdown";

export default function ItemsPage() {
  const dispatch = useDispatch();
  const { items } = useSelector((state) => state.items, shallowEqual);
  const { completeItems, incompleteItems, filterStatus } = useSelector(
    (state) => state.itemStatuses,
    shallowEqual
  );

  if (filterStatus == 0) {
    dispatch(getIncompleteItems());
  } else if (filterStatus == 1) {
    dispatch(getCompleteItems());
  } else {
    dispatch(getItems());
  }

  let visibleItems = [];
  visibleItems = Array.from(
    (filterStatus == 0
      ? incompleteItems
      : filterStatus == 1
      ? completeItems
      : items) ?? []
  );
  return (
    <>
      <CompleteFilterDropdown />
      <h1>Items</h1>
      <ItemDialog />

      {visibleItems.map((i: Item) => (
        <ItemDetail item={i} />
      ))}
    </>
  );
}
