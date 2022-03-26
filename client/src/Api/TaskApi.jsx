import axios from 'axios';
import Cookies from 'js-cookie';

const API = axios.create({ baseURL: "http://localhost:5000", });

API.interceptors.request.use((req) => {
    if (Cookies.get('accessToken')) {
      req.headers.Authorization = `Bearer ${Cookies.get('accessToken')}`;
    }
    const refresh = (task) => API.post('/api/refresh', task);
    return req;
  });

export const createTask = (task) => API.post('/api/task/create', task);
