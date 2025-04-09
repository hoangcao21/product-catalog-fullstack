import { PATH_PAGE_PRODUCT_DETAIL } from '../shared/routes';
import { Button } from '@mui/material';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import clsx from 'clsx';
import { Path } from 'path-parser';
import { FC } from 'react';
import { useNavigate } from 'react-router';

export interface ProductCardProps {
  className?: string;
  productId: string;
  name: string;
  category: string;
  imageUrl: string;
  description: string;
  price: string;
}

export const ProductCard: FC<ProductCardProps> = ({
  className,
  productId,
  name,
  category,
  imageUrl,
  description,
  price,
}) => {
  const navigate = useNavigate();

  return (
    <Card className={clsx('product-card', className)}>
      <div className={clsx('p-[16px]')}>
        <Typography variant="h5">{name}</Typography>
        <Typography variant="subtitle1">{category}</Typography>
      </div>

      <CardMedia
        className={clsx('max-h-[200px] md:max-h-[100px]')}
        component="img"
        image={imageUrl}
        alt="Paella dish"
      />

      <CardContent>
        <Typography
          className={clsx('max-h-[80px] line-clamp-4')}
          variant="body2"
          sx={{ color: 'text.secondary' }}
        >
          {description}
        </Typography>
      </CardContent>

      <CardActions className={clsx('flex flex-row justify-between p-[16px]!')}>
        <Typography className={clsx('text-3xl!')}>{`$${price}`}</Typography>

        <Button
          variant="outlined"
          onClick={() => {
            navigate(
              new Path(`/${PATH_PAGE_PRODUCT_DETAIL}`).build({ productId }),
            );
          }}
        >
          View details
        </Button>
      </CardActions>
    </Card>
  );
};
