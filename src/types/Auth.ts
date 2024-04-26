export type LoginResponse = {
  exp: string;
  user: {
    name: string;
    email: string;
    profile_picture: string;
    is_verified: boolean;
    is_google: boolean;
  };
};
