/* eslint-disable @typescript-eslint/prefer-as-const */
export const BACKEND_URL = import.meta.env.VITE_BACKEND_URL; // Note the "VITE_" prefix to expose public environment to client
export const AUTH_COOKIE_ID: 'cookie_access_token' = 'cookie_access_token';
export const AUTH_REFRESH_COOKIE_ID: 'cookie_refresh_token' =
  'cookie_refresh_token';
