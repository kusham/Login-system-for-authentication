import axios from 'axios';

const API = axios.create({ baseURL: "http://localhost:5000" });

export const signUp = (userData) => API.post('/api/user/signUp', userData);
export const signIn = (userData) => API.post('/api/user/signIn', userData);