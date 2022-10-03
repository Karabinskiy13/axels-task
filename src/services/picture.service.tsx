import { Image } from '../types';
import axiosService from './axios.service';

interface ImagesResponse {
  hits: Image[];
  total: number;
}

export const pictureService = {
  getImagesByQuery: async (q: string, page: number) =>
    await axiosService
      .get<ImagesResponse>('/', { params: { q, per_page: 24, page } })
      .then((value) => value.data)
};
