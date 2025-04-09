import clsx from 'clsx';
import { FC, ReactNode } from 'react';

interface PageProps {
  id?: string;
  className?: string;
  children: ReactNode[] | ReactNode;
}

export const Page: FC<PageProps> = ({ id, className, children }) => {
  return (
    <div
      id={id}
      className={clsx(
        'mt-0 mb-0 w-full sm:ml-auto sm:mr-auto h-screen sm:w-3/4 bg-gray-100 pt-5 pb-5 pl-2 pr-2',
        className,
      )}
    >
      {children}
    </div>
  );
};
