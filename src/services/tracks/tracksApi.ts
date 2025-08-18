import axios from 'axios';
import { BASE_URL } from '../constants';
import { TrackType } from '@shared-types/SharedTypes';

export const getTracks = async (): Promise<TrackType[]> => {
  return await axios(BASE_URL + '/catalog/track/all/').then((res) => {
    return res.data.data;
  });
};
