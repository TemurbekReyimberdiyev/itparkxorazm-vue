import axios from 'axios';

const api = axios.create({
  baseURL: 'https://itparkxorazm-laravel.test/api/', // Laravel API URL
  headers: {
    Accept: 'application/json',
  },
});

export default api;
