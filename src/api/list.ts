import { request } from '../axios-setup';

export const getList = () => {
  return request.get(`/fs?path=root`);
};
