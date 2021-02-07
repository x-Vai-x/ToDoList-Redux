export interface Item {
  _id: number;
  Title: String;
  Description: String;
  Due: Date | null;
  Complete: Boolean;
}

export type CreateItemData = Omit<Item, "_id">;
