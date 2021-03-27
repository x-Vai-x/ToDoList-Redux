import { CreateItemData, Item } from "./dataTypes";

export default class API {
  static async getItems(complete?: number): Promise<Item[]> {
    const items = await fetch(`/items/view?complete=${complete ?? 2}`);
    return await items.json();
  }

  static async createItem(data: CreateItemData): Promise<Item> {
    const item = await fetch("/items/create", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    return await item.json();
  }

  static async updateItem(data: Item): Promise<Item> {
    const item = await fetch("/items/update", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    return await item.json();
  }
  static async deleteItem(data: Item) {
    await fetch(`/items/delete/${data._id}`, {
      method: "DELETE",
    });
  }
}
