import axios, { InternalAxiosRequestConfig, AxiosResponse } from "axios";
import { getItem, setItem } from "./storage";

// Axios 인스턴스 생성
const authAxios = axios.create();

authAxios.defaults.withCredentials = true;
authAxios.defaults.baseURL = 'http://localhost:5000/api';

// 전처리
authAxios.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {

    // 로그인 시 토큰 제외
    if(config.url === '/login') {
      return config;
    }

    const accessToken = getItem('accessToken')
    if(!accessToken) {
      console.log(config);
      return config;
    }

    config.headers['Content-Type'] = 'application/json';
    config.headers['Authorization'] = `Bearer ${accessToken}`;

    return config;
  },
  (error: any) => {
    console.log('authAxios.interceptors.request.use: ',error);
    return Promise.reject(error);
  }
);

// // 후처리
authAxios.interceptors.response.use(
  (response: AxiosResponse) => {
    // console.log(response)
    return response;
  }, 
  async (error) => {
    console.error("Error response:", error); // 에러 로그

    const originalRequest = error.config; // 기존 요청

    // Access Token 만료 시
    if(error.response?.status === 401 && !originalRequest._retry) {
      console.log('Access token expired.')
      originalRequest._retry = true;

      try {
        const refreshResponse = await authAxios.get('/refresh-token', {
          withCredentials: true
        });

        // 새로운 Access Token 저장
        const newAccessToken = refreshResponse.data.accessToken;
        if(newAccessToken) {
          setItem('accessToken', newAccessToken);
          // 기존 요청에 새로운 토큰을 다시 시도
          originalRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;
  
          return authAxios(originalRequest)
        } else {
          throw new Error('No access token in refresh response');
        }

      } catch(refreshError) {
        console.error('Token refresh failed: ', refreshError);
        localStorage.removeItem('accessToken');
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
)

// 후처리2
// authAxios.interceptors.response.use(
//   (response: AxiosResponse) => {
//     return response;
//   },
//   async (error) => {
//     console.log(error.config);
//     if(error.response?.status === 401) {
//       // window.location.href = '/unauthorized';
//     } else if(error.response?.status === 404) {
//       window.location.href = '/notFound';
//     } else if(error.response && error.response?.status === 500) {
//       const errorCode = error.response.data.errorCode;
//       if(errorCode === 7001) {
//         await tokenRefresh(authAxios);
//         const accessToken = getItem('accessToken');
//         error.config.headers['Authorization'] = `Bearer ${accessToken}`;

//         return authAxios(error.config);
//       }
//     }
//   }
// )

export default authAxios;