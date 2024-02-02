import axios from 'axios';

export const blingConfigAxios = async (refreshToken?: string) => {
  axios.defaults.baseURL = 'https://api.mercadolibre.com';
  // axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  axios.defaults.headers.common['Accept'] = `application/json`;
  axios.defaults.headers.common['Content-Type'] = `application/json`;
};
