import React, { useEffect, useState } from "react";

import ItemDialog from "../components/dialogs/ItemDialog";
import ItemDetail from "../components/partials/ItemDetail";
import { Item } from "../dataTypes";

type IProps = {
  complete: Number;
};

export default function ItemsPage({ complete }: IProps) {
  const [items, setItems] = useState([]);
  useEffect(() => {
    if (complete == 2) {
      fetch("/items/view")
        .then((response) => response.json())
        .then((response) => setItems(response));
    } else if (complete == 0) {
      fetch("/items/view?complete=false")
        .then((response) => response.json())
        .then((response) => setItems(response));
    } else {
      fetch("/items/view?complete=true")
        .then((response) => response.json())
        .then((response) => setItems(response));
    }
  });
  return (
    <>
      <h1>Items</h1>
      <ItemDialog />

      {items.map((i: Item) => (
        <ItemDetail item={i} />
      ))}
    </>
  );
}
