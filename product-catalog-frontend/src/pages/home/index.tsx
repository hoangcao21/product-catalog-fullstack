import { Page } from '../../components/page';
import { ProductCard } from '../../components/product-card';
import { SearchBox } from '../../components/search-box';
import { EntryPointContextProvider } from '../../shared/contexts/entry-point';
import { PaginatedResponseBody } from '../../shared/dto';
import { Cursor, CursorHistory } from '../../shared/history/cursor-history';
import { getProducts, ProductCategory, ProductDto } from './api';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import Divider from '@mui/material/Divider';
import clsx from 'clsx';
import { FC, useContext, useEffect, useMemo, useState } from 'react';

const cursorHistory = new CursorHistory();

const defaultLimit = 10;

export const HomePage: FC = () => {
  const [products, setProducts] = useState<ProductDto[]>([]);

  const [prevCursor, setPrevCursor] = useState<Cursor>(undefined);
  const [cursor, setCursor] = useState<Cursor>(undefined);
  const [nextCursor, setNextCursor] = useState<Cursor>(undefined);

  const [nameFilter, setNameFilter] = useState<string | undefined>(undefined);
  const [categoryFilter, setCategoryFilter] = useState<ProductCategory>(
    ProductCategory.Food,
  );

  const shouldPrevCursorDisabled: boolean = !cursorHistory.exists();
  const shouldNextCursorDisabled: boolean = !nextCursor;

  console.log('cursorHistory ', cursorHistory);

  const { setLoading, authPresent } = useContext(EntryPointContextProvider);

  function invokeGetProducts(
    query: {
      category: ProductCategory;
      name?: string;
      cursor?: string;
      limit?: number;
    },
    callback?: (data: PaginatedResponseBody<ProductDto>) => void,
  ) {
    const { category, name, cursor, limit } = query;

    setLoading(true);

    getProducts(category, name, cursor, limit)
      .then((data: PaginatedResponseBody<ProductDto>) => {
        setProducts(data.result);

        // eslint-disable-next-line @typescript-eslint/no-unused-expressions
        callback && callback(data);

        setLoading(false);
      })
      .catch(() => {
        // Force reload to the initial state to avoid edge cases
        window.location.reload();
      });
  }

  const onNext = () => {
    console.log('next');

    cursorHistory.push(cursor); // Add current cursor to cursor history

    invokeGetProducts(
      {
        category: categoryFilter,
        name: nameFilter,
        cursor: nextCursor,
        limit: defaultLimit,
      },
      (data) => {
        const lastCursor = cursorHistory.peek(); // Peek previous cursor from cursor history. For example, if you are at page #2, then last cursor is for getting data for page #1

        setPrevCursor(lastCursor); // To fetch data for previous page based on cursor before cursor of the current page

        setCursor(nextCursor); // current "nextCursor" becomes new cursor

        setNextCursor(data.nextCursor); // To fetch data for next page based on new cursor from backend
      },
    );
  };

  const onPrev = () => {
    console.log('prev');

    cursorHistory.pop();

    invokeGetProducts(
      {
        category: categoryFilter,
        name: nameFilter,
        cursor: prevCursor,
        limit: defaultLimit,
      },
      (data) => {
        const lastCursor = cursorHistory.peek(); // Peek previous cursor from cursor history. For example, if you are at page #2, then last cursor is for getting data for page #1

        setPrevCursor(lastCursor); // To fetch data for previous page based on cursor before cursor of the current page

        setCursor(prevCursor); // current "prevCursor" becomes new cursor

        setNextCursor(data.nextCursor); // To fetch data for next page based on new cursor from backend
      },
    );
  };

  // Initial call to get data from API
  useEffect(() => {
    if (authPresent) {
      invokeGetProducts({ category: categoryFilter }, (data) => {
        setPrevCursor(undefined);
        setNextCursor(data.nextCursor);
      });
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Page id="home-page">
      <SearchBox
        className={clsx('mb-5 h-[180px]')}
        defaultCategory={categoryFilter}
        onSubmit={({ pCategory, pName }) => {
          setCategoryFilter(pCategory);

          setNameFilter(pName);

          invokeGetProducts(
            {
              category: pCategory,
              name: pName,
              cursor: undefined,
              limit: defaultLimit,
            },
            (data) => {
              cursorHistory.reset();

              setPrevCursor(undefined);
              setNextCursor(data.nextCursor);
            },
          );
        }}
      />

      <Divider />

      <div
        className={clsx(
          'mt-5 overflow-auto h-[calc(100%-280px-3.75rem)] md:flex md:flex-row md:flex-wrap md:gap-3',
        )}
      >
        {useMemo(() => {
          if (!products) {
            return <span>Nothing to display</span>;
          }

          if (!products.length) {
            return <span>No product is available. Sorry :(</span>;
          }

          return products.map(
            (
              { productId, name, category, description, imageUrl, price },
              index,
            ) => (
              <ProductCard
                className={clsx(index > 0 && 'max-md:mt-3', 'md:w-[250px]')}
                key={productId}
                productId={productId}
                name={name}
                category={category}
                description={description}
                imageUrl={imageUrl}
                price={price.toString()}
              />
            ),
          );
        }, [products])}
      </div>

      <div
        className={clsx(
          'mt-5 h-[100px] flex flex-row justify-center items-center',
        )}
      >
        <ButtonGroup variant="outlined">
          <Button
            className="basis-[50%]"
            disabled={shouldPrevCursorDisabled}
            onClick={onPrev}
          >
            Previous
          </Button>

          <Button
            className="basis-[50%]"
            disabled={shouldNextCursorDisabled}
            onClick={onNext}
          >
            Next
          </Button>
        </ButtonGroup>
      </div>
    </Page>
  );
};
