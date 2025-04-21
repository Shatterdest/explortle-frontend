import axios from 'axios'

const FRONTEND_API_KEY = import.meta.env.VITE_FRONTEND_API_KEY;

const api = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL, 
})

api.interceptors.request.use(config => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  if (FRONTEND_API_KEY) {
    config.headers['x-api-key'] = FRONTEND_API_KEY;
  }

  return config;
}, error => {
  return Promise.reject(error);
});

export default api
