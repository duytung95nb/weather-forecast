// First we need to import axios.js
import axios from 'axios';
// Next we make an 'instance' of it
const AxiosAdapter = axios.create({});

AxiosAdapter.interceptors.response.use(
  (result) => {
    return result.data;
  },
  (error) => {
    return Promise.reject(error);
  },
);

export default AxiosAdapter;
