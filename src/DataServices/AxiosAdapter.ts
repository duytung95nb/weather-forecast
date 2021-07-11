// First we need to import axios.js
import axios, { AxiosError } from 'axios';
import APP_CONSTANT from '../Constants/AppConstant';
// Next we make an 'instance' of it
const AxiosNormal = axios.create({});

AxiosNormal.interceptors.response.use(
  (result) => {
    return result.data;
  },
  (error: AxiosError) => {
    return Promise.reject(error);
  },
);

const AxiosBackEndAdapter = axios.create({});
AxiosBackEndAdapter.interceptors.request.use(function (config) {
  config.method = 'POST';
  const requestedUrl = config.url;
  config.url = APP_CONSTANT.BACKEND_API_BASE_URL;
  config.headers = {
    'Content-Type': 'application/json',
  };
  config.data = {
    url: requestedUrl,
  };
  return config;
});

AxiosBackEndAdapter.interceptors.response.use(
  (result) => {
    return result.data;
  },
  (error: AxiosError) => {
    return Promise.reject(error);
  },
);
const AxiosAdapter =
  process.env.REACT_APP_USE_BACK_END_ADAPTER === 'true' ? AxiosBackEndAdapter : AxiosNormal;

export default AxiosAdapter;
