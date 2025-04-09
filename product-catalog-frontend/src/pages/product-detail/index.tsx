import { Page } from '../../components/page';
import { EntryPointContextProvider } from '../../shared/contexts/entry-point';
import { ProductDto } from '../home/api';
import { getProductDetail } from './api';
import { Description } from './components/description';
import { Information } from './components/information';
import { Navigation } from './components/navigation';
import { Reviews } from './components/reviews';
import { Divider } from '@mui/material';
import clsx from 'clsx';
import { FC, useContext, useEffect, useMemo, useState } from 'react';
import { useNavigate, useParams } from 'react-router';

interface ProductDetailPageProps {
  id?: string;
  className?: string;
}

export const ProductDetailPage: FC<ProductDetailPageProps> = () => {
  const [productDetail, setProductDetail] = useState<ProductDto | undefined>(
    undefined,
  );

  const { setLoading } = useContext(EntryPointContextProvider);

  const navigate = useNavigate();
  const params = useParams();

  const invokeGetProductDetail = (productId: string) => {
    setLoading(true);

    getProductDetail(productId).then((respBody) => {
      setProductDetail(respBody.result);

      setLoading(false);
    });
  };

  useEffect(() => {
    if (params.productId) {
      invokeGetProductDetail(params.productId);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params.productId, setLoading]);

  return (
    <Page id="product-detail">
      <Navigation
        className={clsx('mb-5')}
        onClickBack={() => {
          navigate('/home');
        }}
      />

      {useMemo(() => {
        return productDetail ? (
          <Information
            category={productDetail.category}
            name={productDetail.name}
            imageUrl={productDetail.imageUrl}
            price={productDetail.price.toString()}
          />
        ) : (
          <span>Nothing to display</span>
        );
      }, [productDetail])}

      <Divider />

      <Description
        className={clsx('mt-5 mb-5')}
        value={productDetail?.description}
      />

      <Divider />

      {useMemo(() => {
        return (
          <Reviews
            productId={params.productId!}
            className={clsx('mt-5')}
            onReviewSent={async () => {
              invokeGetProductDetail(params.productId!);
            }}
            reviews={productDetail?.reviews}
          />
        );
        // eslint-disable-next-line react-hooks/exhaustive-deps
      }, [productDetail?.reviews, params.productId])}
    </Page>
  );
};
