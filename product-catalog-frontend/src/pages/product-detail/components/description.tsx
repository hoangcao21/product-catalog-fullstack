import { Typography } from '@mui/material';
import clsx from 'clsx';
import { FC } from 'react';

interface DescriptionProps {
  id?: string;
  className?: string;
  value?: string;
}

export const Description: FC<DescriptionProps> = ({ id, className, value }) => {
  return (
    <div id={id} className={clsx('product-description', className)}>
      <Typography variant="h5" className={'mb-3!'}>
        Description
      </Typography>

      <Typography>{value || 'Nothing to display'}</Typography>
    </div>
  );
};
