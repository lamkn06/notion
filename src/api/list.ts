import { request } from '../axios-setup';
import { ItemsResponse } from '../typings/item';

export const getList = (path: string): Promise<ItemsResponse> => {
  return request.get(`/fs?path=${encodeURIComponent(path)}`);
};
