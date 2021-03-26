import { CreateItemData, Item } from "./dataTypes";

export default class API {
  static async getItems(complete?: number) {
    const items = await fetch(`/items/view?complete=${complete}`);
    return items;
  }

  static async createItem(data: CreateItemData) {
    await fetch("/items/create", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
  }

  static async updateItem(data: Item) {
    await fetch("/items/update" {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
  }
  static async deleteItem(itemId: number) {
    await fetch(`/items/delete/${itemId}`, {
      method: "DELETE",
    });
  }
}
