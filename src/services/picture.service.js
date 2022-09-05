import axiosService from './axios.service';

export const pictureService = {
  getImagesByQuery: (q, page) =>
    axiosService.get('/', { params: { q, per_page: 24, page } }).then((value) => value.data)
};
