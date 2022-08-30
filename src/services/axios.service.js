import axios from 'axios';

import { baseURL } from '../constants';

const axiosInstance = axios.create({
  baseURL,
  params: { key: '29600273-dbde9bb11b7bad6c0f81a0e0a' }
});

// axiosInstance.interceptors.response.use(
//   (response) => response,
//   (error) => {
//     console.log(error);
//     return Promise.reject(error);
//   }
// );
export default axiosInstance;
