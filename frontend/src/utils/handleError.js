import axios from 'axios';
import { config } from '../configs';

const handleError = (error) => {
  const originalRequest = error.config;
  const isExpired = error.response?.data?.msg === 'jwt expired';

  if (!isExpired || !originalRequest) {
    return error;
  }

  const session = localStorage.getItem('auth')
    ? JSON.parse(localStorage.getItem('auth'))
    : {};

  if (!session.refreshToken || originalRequest._retryCount) {
    localStorage.removeItem('auth');
    window.location.href = '/login';
    return error;
  }

  originalRequest._retryCount = 1;

  return axios
    .get(`${config.api_host_dev}/cms/${session.refreshToken}`)
    .then((res) => {
      const token = res.data.data.token;
      localStorage.setItem(
        'auth',
        JSON.stringify({
          ...session,
          token,
        })
      );
      originalRequest.headers.Authorization = `Bearer ${token}`;
      return axios(originalRequest);
    })
    .catch((refreshError) => {
      localStorage.removeItem('auth');
      window.location.href = '/login';
      return Promise.reject(refreshError);
    });
};

export default handleError;
