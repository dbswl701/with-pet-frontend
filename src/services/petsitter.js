import axios from 'axios';
import baseUrl from './api';

export const getPetsitterMyInfo = async () => {
  return axios.get(`${baseUrl}/v2/pet-sitters/my-info`, { withCredentials: true });
};

export const get = () => {};
