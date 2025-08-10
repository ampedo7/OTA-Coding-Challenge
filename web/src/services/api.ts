import axios from 'axios';

export const apiCall = axios.create({
  baseURL: 'http://localhost:8000'
});

apiCall.interceptors.request.use((request) => {
  return request;
});
