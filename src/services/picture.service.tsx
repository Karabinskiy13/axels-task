import axiosService from './axios.service';
import { IImage } from '../Interface';



export const pictureService = {
  getImagesByQuery: (q:any, page:number) =>
    axiosService.get('/', { params: { q, per_page: 24, page } }).then((value) => value.data)
};

