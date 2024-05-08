import { User } from './User';

export type LoginResponse = {
  exp: string;
  user: User;
  token: {
    access_token: string;
    refresh_token: string;
  };
};
