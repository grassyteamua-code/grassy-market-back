import { ICookieOptions } from '../auth/interfaces/cookie-options.interface';

export const getCookieOptions = (expires: Date): ICookieOptions => ({
  httpOnly: true,
  sameSite: 'lax',
  secure: false,
  path: '/',
  expires,
});
