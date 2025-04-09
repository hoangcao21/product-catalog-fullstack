import { rotateCredentials } from '../pages/auth/api';
import { BACKEND_URL } from './config';
import { PATH_PAGE_HOME } from './routes';
import { authUtils } from './utils/auth';
import Axios, {
  AxiosInstance,
  HttpStatusCode,
  InternalAxiosRequestConfig,
} from 'axios';
import * as qs from 'qs';

export const axiosInstance: AxiosInstance = Axios.create({
  baseURL: BACKEND_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
});

axiosInstance.interceptors.request.use((requestConfig) => {
  const newRequestConfig: InternalAxiosRequestConfig = {
    ...requestConfig,
    headers: {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      ...(requestConfig.headers as any),
    },
    paramsSerializer(params) {
      return qs.stringify(params);
    },
  };

  return newRequestConfig;
});

const REFRESH_TOKEN_IN_PROGRESS_KEY = 'REFRESH_TOKEN_IN_PROGRESS_KEY';

axiosInstance.interceptors.response.use(
  (response) => response.data, // Directly return successful responses.
  async (error) => {
    const originalRequest = error.config;

    const refreshTokenInProgress = !!localStorage.getItem(
      REFRESH_TOKEN_IN_PROGRESS_KEY,
    );

    console.log(
      '❓ Already retry to refresh token? ',
      refreshTokenInProgress ? 'yes' : 'no',
    );

    if (
      error.response?.status === HttpStatusCode.Unauthorized &&
      !refreshTokenInProgress
    ) {
      localStorage.setItem(REFRESH_TOKEN_IN_PROGRESS_KEY, 'present'); // Mark the request as retried to avoid infinite loops.

      try {
        await rotateCredentials();

        authUtils.setCredentialsPresent();

        if (import.meta.env.PROD) {
          window.location.replace(`/${PATH_PAGE_HOME}`);
        }

        // Retry failed previous request after refresh token successfully
        return axiosInstance(originalRequest);
      } catch (refreshError) {
        // Handle refresh token errors by clearing stored tokens and redirecting to the login page.
        console.error('Failed to refresh token', refreshError);

        window.alert(
          'Your authentication credentials are expired, you will be redirected to the login page...',
        );

        // Clear tokens will trigger EntryPointProvider
        authUtils.clearAll();

        return Promise.reject(refreshError);
      } finally {
        localStorage.removeItem(REFRESH_TOKEN_IN_PROGRESS_KEY);
      }
    }

    alert(`Some error occurred... ${JSON.stringify(error.response)}`);

    return Promise.reject(error); // For all other errors, return the error as is.
  },
);
