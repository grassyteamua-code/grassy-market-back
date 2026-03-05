// import axios, { InternalAxiosRequestConfig, AxiosError } from 'axios';

// export const httpService = axios.create({
//     baseURL: 'http://localhost:5000/api',
//     withCredentials: true,
// });

// httpService.interceptors.request.use(
//   (config: InternalAxiosRequestConfig): InternalAxiosRequestConfig => {
//     const accessToken = localStorage.getItem('accessToken');

//     if (accessToken && config.headers) {
//       config.headers['Authorization'] = `Bearer ${accessToken}`;
//     }

//     return config;
//   },
//   (error: AxiosError) => {
//     return Promise.reject(error);
//   }
// );
