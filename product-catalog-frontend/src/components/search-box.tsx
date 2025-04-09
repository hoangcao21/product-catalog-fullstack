import { ProductCategory } from '../pages/home/api';
import { yupResolver } from '@hookform/resolvers/yup';
import SearchIcon from '@mui/icons-material/Search';
import { Button } from '@mui/material';
import clsx from 'clsx';
import { FC } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { SelectElement, TextFieldElement } from 'react-hook-form-mui';
import * as yup from 'yup';

const validationSchema = yup
  .object({
    pName: yup.string().max(255).optional(),
    pCategory: yup
      .mixed<ProductCategory>()
      .oneOf(Object.values(ProductCategory))
      .required(),
  })
  .required();

interface SearchBoxProps {
  className?: string;
  defaultCategory?: ProductCategory;
  onSubmit?: SubmitHandler<{
    pName?: string;
    pCategory: ProductCategory;
  }>;
}

export const SearchBox: FC<SearchBoxProps> = ({
  className,
  onSubmit,
  defaultCategory = ProductCategory.Food,
}) => {
  const { control, handleSubmit } = useForm({
    mode: 'all',
    resolver: yupResolver(validationSchema),
    defaultValues: { pName: undefined, pCategory: defaultCategory },
  });

  return (
    <div id="search-box" className={className}>
      <form onSubmit={onSubmit ? handleSubmit(onSubmit) : undefined}>
        <div
          className={clsx('flex flex-col justify-center items-center gap-2')}
        >
          <SelectElement
            className={clsx('w-full lg:w-3/4 h-[65px]')}
            label="Product Category"
            size="small"
            name="pCategory"
            control={control}
            required
            options={Object.entries(ProductCategory).map(([key, value]) => {
              return { id: value, label: key };
            })}
          />

          <TextFieldElement
            className={clsx('w-full lg:w-3/4 h-[65px]')}
            label="Product Name"
            size="small"
            name="pName"
            control={control}
            helperText="You can search products by name"
          />

          <Button
            startIcon={<SearchIcon />}
            size="small"
            variant="contained"
            type={'submit'}
            color={'primary'}
          >
            Search
          </Button>
        </div>
      </form>
    </div>
  );
};
