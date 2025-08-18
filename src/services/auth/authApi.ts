import axios from 'axios';
import { BASE_URL } from '../constants';

type loginProps = {
  email: string;
  password: string;
};

export const login = (userData: loginProps) => {
  return axios.post(BASE_URL + '/user/login/', userData, {
    headers: { 'content-type': 'application/json' },
  });
};
