import { Typography } from '@mui/material';
import clsx from 'clsx';
import { FC } from 'react';

interface InformationProps {
  id?: string;
  className?: string;
  imageUrl?: string;
  name?: string;
  category?: string;
  price?: string;
}

export const Information: FC<InformationProps> = ({
  id,
  className,
  imageUrl,
  name,
  category,
  price,
}) => {
  return (
    <div id={id} className={clsx('product-header', className)}>
      <Typography variant="h5" className={'mb-3!'}>
        Information
      </Typography>

      <div className={clsx('flex flex-row gap-5 mb-5')}>
        <img
          className={'object-cover w-1/2 h-[250px]'}
          src={
            imageUrl ||
            'https://media.istockphoto.com/id/1147544807/vector/thumbnail-image-vector-graphic.jpg?s=612x612&w=0&k=20&c=rnCKVbdxqkjlcs3xH87-9gocETqpspHFXu5dIGB4wuM='
          }
        />

        <div className={'w-1/2'}>
          <Typography variant="h5">{name}</Typography>
          <Typography variant="subtitle1">{category}</Typography>
          <Typography variant="h6">
            {price ? `$${price}` : 'Nothing to display'}
          </Typography>
        </div>
      </div>
    </div>
  );
};
