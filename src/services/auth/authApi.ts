import axios from 'axios';
import { BASE_URL } from '../constants';
import {
  accessTokenType,
  tokenTypes,
  UserType,
} from '@shared-types/SharedTypes';

type loginProps = {
  email: string;
  password: string;
};

export const login = async (userData: loginProps): Promise<UserType> => {
  return await axios
    .post(BASE_URL + '/user/login/', userData, {
      headers: { 'content-type': 'application/json' },
    })
    .then((res) => {
      return res.data;
    });
};

type regProps = {
  email: string;
  password: string;
  username: string;
};

export const registration = async (userData: regProps): Promise<UserType> => {
  return await axios
    .post(BASE_URL + '/user/signup/', userData, {
      headers: {
        'content-type': 'application/json',
      },
    })
    .then((res) => {
      return res.data.result;
    });
};

export const getTokens = async (data: loginProps): Promise<tokenTypes> => {
  return await axios.post(BASE_URL + '/user/token/', data).then((res) => {
    return res.data;
  });
};

export const refreshToken = async (
  refresh: string,
): Promise<accessTokenType> => {
  return await axios
    .post(BASE_URL + '/user/token/refresh/', { refresh })
    .then((res) => {
      return res.data;
    });
};
