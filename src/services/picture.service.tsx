import axiosService from './axios.service';
import { IImage } from '../interfaces/Image';



export const pictureService = {
  getImagesByQuery: (q:string, page:number) =>
    axiosService.get<IImage[]>('/', { params: { q, per_page: 24, page } }).then((value) => value.data)
};

