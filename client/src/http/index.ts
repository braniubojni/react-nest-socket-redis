import axios, { AxiosRequestConfig } from 'axios';
export const SERVER_URL = process.env.REACT_APP_SERVER_URL;
console.log(SERVER_URL, '<-- SERVER_URL\n');

const $api = axios.create({
  withCredentials: true,
  baseURL: SERVER_URL,
});

$api.interceptors.request.use((config: AxiosRequestConfig) => {
  if (config.headers) {
    config.headers.Authorization = `Bearer ${localStorage.getItem('token')}`;
  }
  return config;
});

export default $api;
