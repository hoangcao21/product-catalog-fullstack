import { axiosInstance } from '../../shared/axios';
import { StandardResponseBody } from '../../shared/dto';
import { ProductDto } from '../home/api';

export const getProductDetail = (
  productId: string,
): Promise<StandardResponseBody<ProductDto>> => {
  return axiosInstance.get<unknown, StandardResponseBody<ProductDto>>(
    `products/${productId}`,
  );
};

export const postProductReview = (
  productId: string,
  rating: number,
  comment: string,
): Promise<StandardResponseBody<ProductDto>> => {
  return axiosInstance.post<unknown, StandardResponseBody<ProductDto>>(
    `products/${productId}/review`,
    { rating, comment },
  );
};
