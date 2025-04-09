import { axiosInstance } from '../../shared/axios';
import { StandardResponseBody } from '../../shared/dto';

export const login = (
  userName: string,
  password: string,
): Promise<StandardResponseBody> => {
  return axiosInstance.post<unknown, StandardResponseBody>('auth/login', {
    userName,
    password,
  });
};

export const rotateCredentials = (): Promise<StandardResponseBody> => {
  return axiosInstance.post<unknown, StandardResponseBody>('auth/refresh');
};
