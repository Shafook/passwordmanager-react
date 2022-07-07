import axios from 'axios';
import LocalStorageService from '../localstorage/LocalStorageService';

// const localStorageService = LocalStorageService.getService();

// const useRefreshToken = () => {
//   const refresh = async () => {
//     const token = localStorageService.getAccessToken();
//     const refreshToken = localStorageService.getRefreshToken();
//     const response = await axios
//       .post(
//         'https://localhost:44311/api/Account/refresh-token',
//         {
//           token,
//           refreshToken,
//         },
//         {
//           withCredentials: true,
//         }
//       )
//       .then((res) => {
//         if (res.status === 200) {
//           const tokenObj = {
//             accessToken: res.data['accessToken'],
//             refreshToken: res.data.refreshToken['token'],
//           };
//           // 1) put token to LocalStorage
//           localStorageService.setToken(tokenObj);
//           // 2) Change Authorization header
//           axios.defaults.headers.common['Authorization'] =
//             'Bearer ' + localStorageService.getAccessToken();

//           // 3) return originalRequest object with Axios.
//           // return axios(originalRequest);
//           return res.data;
//         }
//       });

//     // return response.data;
//   };

//   return refresh;
// };

// export default useRefreshToken;
