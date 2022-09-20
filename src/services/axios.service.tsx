import axios, { AxiosResponse, AxiosError } from 'axios';

import { baseURL, apiKey } from '../constants';

const axiosInstance = axios.create({
  baseURL,
  params: { key: apiKey }
});

axiosInstance.interceptors.response.use(
  (response: AxiosResponse) => response,
  async (error: AxiosError) => {
    return await Promise.reject(error);
  }
);
export default axiosInstance;
