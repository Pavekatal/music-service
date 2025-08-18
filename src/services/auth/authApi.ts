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

type regProps = {
  email: string;
  password: string;
  username: string;
};

export const registration = (userData: regProps) => {
  return axios.post(BASE_URL + '/user/signup/', userData, {
    headers: {
      'content-type': 'application/json',
    },
  });
};
