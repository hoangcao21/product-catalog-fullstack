import { BlockQuote } from '../../../components/block-quote';
import { Rating, Typography } from '@mui/material';
import clsx from 'clsx';
import { FC } from 'react';

interface ProductReviewProps {
  id?: string;
  className?: string;
  userId: string;
  rating: number;
  comment: string;
}

export const ProductReview: FC<ProductReviewProps> = ({
  id,
  className,
  userId,
  rating,
  comment,
}) => {
  return (
    <div
      id={id}
      className={clsx(
        'product-review',
        'border-1 rounded-sm pt-3 pb-3 pl-1 pr-2',
        className,
      )}
    >
      <Typography className={clsx('mb-2!')}>
        Customer <em>{userId}</em> said:
      </Typography>

      <Rating
        className={clsx('mb-2!')}
        readOnly
        defaultValue={rating}
        max={5}
      />

      <BlockQuote
        className={clsx(
          'overflow-ellipsis overflow-auto break-all max-h-[100px]',
        )}
        value={comment}
      />
    </div>
  );
};
