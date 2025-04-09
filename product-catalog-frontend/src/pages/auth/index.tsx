import { EntryPointContextProvider } from '../../shared/contexts/entry-point';
import { useAuth } from '../../shared/hooks/useAuth';
import { login } from './api';
import { yupResolver } from '@hookform/resolvers/yup';
import { Button, Container, Stack } from '@mui/material';
import clsx from 'clsx';
import { FC, useContext } from 'react';
import { useForm } from 'react-hook-form';
import { TextFieldElement } from 'react-hook-form-mui';
import * as yup from 'yup';

const validationSchema = yup
  .object({
    username: yup.string().max(255).required(),
    password: yup.string().max(255).required(),
  })
  .required();

export const AuthPage: FC = () => {
  const { setLoading } = useContext(EntryPointContextProvider);

  const { setValid } = useAuth();

  const { control, handleSubmit } = useForm({
    mode: 'all',
    resolver: yupResolver(validationSchema),
  });

  return (
    <Container className={clsx('auth-page')}>
      <Stack
        spacing={2}
        direction={'column'}
        className={clsx('h-screen justify-center items-center')}
      >
        <p className={clsx('text-center text-2xl md:text-3xl')}>
          Product Catalog
        </p>

        <form
          className={clsx('flex justify-center items-center')}
          onSubmit={handleSubmit((data) => {
            setLoading(true);

            login(data.username, data.password).then(() => {
              setLoading(false);

              setValid();
            });
          })}
        >
          <Stack spacing={2} className={clsx('md:w-2xs')}>
            <TextFieldElement
              name={'username'}
              label={'Username'}
              control={control}
              required
            />

            <TextFieldElement
              type="password"
              name={'password'}
              label={'Password'}
              control={control}
              required
            />

            <Button variant="contained" type={'submit'} color={'primary'}>
              Login
            </Button>
          </Stack>
        </form>
      </Stack>
    </Container>
  );
};
