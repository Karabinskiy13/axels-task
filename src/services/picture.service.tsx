import axiosService from './axios.service';

export const pictureService = {
  getImagesByQuery: async (q: string, page: number) =>
    await axiosService.get('/', { params: { q, per_page: 24, page } }).then((value) => value.data)
};
