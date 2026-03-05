import { Role } from '../../user/interfaces/interfaces';

export interface IAccessToken {
  id: string;
  username: string;
  email: string;
  role: Role[];
}

export type JwtPayload = IAccessToken;
