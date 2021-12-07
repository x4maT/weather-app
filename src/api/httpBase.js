import axios from 'axios';

const httpBase = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
});

httpBase.interceptors.request.use((config) => {
  config.params = {
    ...config.params,
    units: 'metric',
    appid: process.env.REACT_APP_API_KEY,
  };
  return config;
});

httpBase.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response && error.response.data) {
      return Promise.reject(error.response.data);
    }

    return Promise.reject(error.message);
  },
);

export default httpBase;
