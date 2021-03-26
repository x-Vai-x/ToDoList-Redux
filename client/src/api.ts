import { CreateItemData, Item } from "./dataTypes";

export default class API {
  static async getItems(complete?: number): Promise<Item[]> {
    const items = await fetch(`/items/view?complete=${complete||2}`);
    return items as unknown as Item[];
  }

  static async createItem(data: CreateItemData): Promise<Item>  {
    const item=await fetch("/items/create", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
      return item as unknown as Item;
  }

  static async updateItem(data: Item): Promise<Item> {
    const item=await fetch("/items/update" {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
      return item as unknown as Item;
  }
  static async deleteItem(itemId: number) {
    await fetch(`/items/delete/${itemId}`, {
      method: "DELETE",
    });
  }
}
