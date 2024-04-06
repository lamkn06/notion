export type ItemType = 'directory' | 'file';

export interface ItemsResponse {
  id: string;
  entries: {
    name: string;
    type: ItemType;
  }[];
}
