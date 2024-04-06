import { ItemsResponse } from '../typings/item';

export const getList = (path: string): Promise<ItemsResponse> => {
  return fetch(
    `${process.env.REACT_APP_API_URL}/fs?path=${encodeURIComponent(path)}`,
  ).then((response) => {
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json();
  });
};
