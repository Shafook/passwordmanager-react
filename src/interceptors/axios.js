import axios from 'axios';
import LocalStorageService from '../localstorage/LocalStorageService';

// axios.defaults.baseURL = 'https://localhost:44311/api/Account';
const localStorageService = LocalStorageService.getService();

axios.interceptors.request.use(
  (config) => {
    const token = localStorageService.getAccessToken();
    if (token) {
      config.headers['Authorization'] = 'Bearer ' + token;
    }
    // config.headers['Content-Type'] = 'application/json';
    return config;
  },
  (error) => {
    Promise.reject(error);
  }
);

let refresh = false;

axios.interceptors.response.use(
  (resp) => resp,
  async (error) => {
    const token = LocalStorageService.getAccessToken();
    const refreshToken = localStorageService.getRefreshToken();
    if (error.response.status === 401 && !refresh) {
      refresh = true;

      console.log('refresh');
      const response = await axios.post(
        'https://localhost:44311/api/Account/refresh-token',
        {
          accessToken: token,
          refreshToken: refreshToken,
        },
        {
          withCredentials: true,
        }
      );

      if (response.status === 200) {
        const tokenObj = {
          accessToken: response.data['accessToken'],
          refreshToken: response.data.refreshToken['token'],
        };
        localStorageService.setToken(tokenObj);

        axios.defaults.headers.common['Authorization'] =
          'Bearer ' + localStorageService.getAccessToken();
        refresh = false;

        // 3) return originalRequest object with Axios.
        return axios(error.config);
      }
    }
    refresh = false;
    return Promise.reject(error);
  }
);
