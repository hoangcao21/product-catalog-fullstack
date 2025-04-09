import { ProductReviewDto } from '../../home/api';
import { postProductReview } from '../api';
import { ProductReview } from './product-review';
import { ReviewDialog } from './review-dialog';
import EditIcon from '@mui/icons-material/Edit';
import { Button, Typography } from '@mui/material';
import clsx from 'clsx';
import { FC, useMemo, useState } from 'react';

interface ReviewsProps {
  id?: string;
  productId: string;
  className?: string;
  reviews?: ProductReviewDto[];
  onReviewSent: () => Promise<void>;
}

export const Reviews: FC<ReviewsProps> = ({
  id,
  productId,
  className,
  reviews,
  onReviewSent,
}) => {
  const [shouldOpenDialog, setShouldOpenDialog] = useState(false);

  const [formDisabled, setFormDisabled] = useState(false);

  const invokePostProductReview = async (
    productId: string,
    rating: number,
    comment: string,
  ) => {
    setFormDisabled(true);

    await postProductReview(productId, rating, comment);

    setFormDisabled(false);
  };

  return (
    <div id={id} className={clsx('product-reviews', className)}>
      <div className={'mb-3 flex flex-row justify-between'}>
        <Typography variant="h5">Recent Reviews</Typography>

        <Button
          startIcon={<EditIcon />}
          variant="contained"
          size="small"
          onClick={() => {
            setShouldOpenDialog(true);
          }}
        >
          Write your review
        </Button>
      </div>

      {useMemo(() => {
        return reviews?.length ? (
          reviews?.map((val, index) => {
            return (
              <ProductReview
                className={clsx(index > 0 && 'mt-5')}
                key={val.reviewId}
                userId={val.userId}
                rating={val.rating}
                comment={val.comment}
              />
            );
          })
        ) : (
          <span>Nothing to display</span>
        );
      }, [reviews])}

      <ReviewDialog
        disabled={formDisabled}
        open={shouldOpenDialog}
        onClose={() => {
          setShouldOpenDialog(false);
        }}
        onSubmit={(reset) => {
          return async (data) => {
            await invokePostProductReview(productId, data.rating, data.comment);

            setShouldOpenDialog(false);

            reset();

            await onReviewSent();
          };
        }}
      />
    </div>
  );
};
