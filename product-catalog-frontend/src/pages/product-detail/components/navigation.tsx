import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { Button } from '@mui/material';
import clsx from 'clsx';
import { FC, MouseEventHandler } from 'react';

interface NavigationProps {
  id?: string;
  className?: string;
  onClickBack?: MouseEventHandler<HTMLButtonElement>;
}

export const Navigation: FC<NavigationProps> = ({
  id,
  className,
  onClickBack,
}) => {
  return (
    <div id={id} className={clsx('navigation', className)}>
      <Button
        startIcon={<ArrowBackIcon />}
        variant="outlined"
        size="small"
        onClick={onClickBack}
      >
        Back
      </Button>
    </div>
  );
};
