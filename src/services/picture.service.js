import axiosService from './axios.service';

export const pictureService = {
  getImagesByQuery: async (q, page) => {
    const { data } = await axiosService.get('/', { params: { q, per_page: 24, page } });
    return data;
  }
};
