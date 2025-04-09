import { AUTH_COOKIE_ID, AUTH_REFRESH_COOKIE_ID } from '../config';
import Cookies from 'universal-cookie';

const commonCookieOptions = {
  path: '/', // Valid for all URLs
};

/**
 * Universal Cookies - Cookie helper that haves onChange listener (so helpful)!
 */
const cookies = new Cookies();

export interface AuthCookies {
  [AUTH_COOKIE_ID]: string;
  [AUTH_REFRESH_COOKIE_ID]: string;
}

const CREDENTIALS_EXISTING_KEY = 'CREDENTIALS_EXISTING_KEY';

export const CREDENTIALS_CHANGED_EVENT = 'CREDENTIALS_CHANGED_EVENT';

/**
 * Authentication Utility - Cookie Storage manipulation object
 */
export const authUtils = {
  isCredentialsPresent: function () {
    const isCredentialsSet: boolean = !!localStorage.getItem(
      CREDENTIALS_EXISTING_KEY,
    );

    return isCredentialsSet;
  },
  setCredentialsPresent: function () {
    localStorage.setItem(CREDENTIALS_EXISTING_KEY, 'present');

    window.dispatchEvent(new Event(CREDENTIALS_CHANGED_EVENT));
  },
  removeCredentialsPresent: function () {
    localStorage.removeItem(CREDENTIALS_EXISTING_KEY);

    window.dispatchEvent(new Event(CREDENTIALS_CHANGED_EVENT));
  },
  // Clear Access Token and Refresh Token
  clearAll: function () {
    cookies.remove(AUTH_COOKIE_ID, { ...commonCookieOptions, maxAge: 0 });

    cookies.remove(AUTH_REFRESH_COOKIE_ID, {
      ...commonCookieOptions,
      maxAge: 0,
    });

    this.removeCredentialsPresent();
  },
};
