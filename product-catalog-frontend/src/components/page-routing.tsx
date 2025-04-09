import { AuthPage } from '../pages/auth';
import { HomePage } from '../pages/home';
import { ProductDetailPage } from '../pages/product-detail';
import { SplashPage } from '../pages/splash';
import {
  PATH_PAGE_AUTH,
  PATH_PAGE_HOME,
  PATH_PAGE_PRODUCT_DETAIL,
} from '../shared/routes';
import { EntryPoint } from './entry-point';
import { FC } from 'react';
import { CookiesProvider } from 'react-cookie';
import { BrowserRouter, Route, Routes } from 'react-router';

export const PageRouting: FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          element={
            <CookiesProvider defaultSetOptions={{ path: '/' }}>
              <EntryPoint />
            </CookiesProvider>
          }
        >
          <Route index element={<SplashPage />} />
          <Route path={PATH_PAGE_AUTH} element={<AuthPage />} />
          <Route path={PATH_PAGE_HOME} element={<HomePage />} />
          <Route
            path={PATH_PAGE_PRODUCT_DETAIL}
            element={<ProductDetailPage />}
          />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};
