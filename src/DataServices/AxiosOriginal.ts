import axios, { AxiosError } from 'axios';

// Next we make an 'instance' of it
const AxiosOriginal = axios.create({});

AxiosOriginal.interceptors.response.use(
  (result) => {
    return result.data;
  },
  (error: AxiosError) => {
    return Promise.reject(error);
  },
);

export default AxiosOriginal;
