import { axiosInstance } from '../../shared/axios';
import { PaginatedResponseBody } from '../../shared/dto';

export enum ProductCategory {
  Food = 'food',
  Tech = 'tech',
  Lifestyle = 'lifestyle',
}

export interface ProductReviewDto {
  reviewId: string;
  productId: string;
  userId: string;
  rating: number;
  comment: string;
}

export interface ProductDto {
  productId: string;
  name: string;
  description: string;
  price: number;
  category: string;
  imageUrl: string;
  reviews?: ProductReviewDto[];
}

export const getProducts = (
  category: ProductCategory,
  name?: string,
  cursor?: string,
  limit: number = 10,
): Promise<PaginatedResponseBody<ProductDto>> => {
  return axiosInstance.get<unknown, PaginatedResponseBody<ProductDto>>(
    'products',
    { params: { category, name, cursor, limit } },
  );
};
