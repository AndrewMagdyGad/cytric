import { User } from 'src/users/schemas/user.schema';

export type LoginPayload = {
  email: string;
  password: string;
};

export type LoginResult = {
  user: User;
  token: string;
};
