export type TrackType = {
  _id: number;
  name: string;
  author: string;
  release_date: string;
  genre: string[];
  duration_in_seconds: number;
  album: string;
  logo: null | string;
  track_file: string;
  stared_user: string[];
};

export type UserType = {
  email: string;
  username: string;
  _id: number;
};
