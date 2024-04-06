import { request } from '../axios-setup';
import { ItemsResponse } from '../typings/item';

export const getList = (): Promise<ItemsResponse> => {
  return request.get(`/fs?path=root`);
};

export const getDirectory = (directory: string): Promise<ItemsResponse> => {
  return request.get(`/fs?path=${encodeURIComponent(directory)}`);
};
