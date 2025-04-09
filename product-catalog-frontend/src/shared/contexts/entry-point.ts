import { createContext } from 'react';

export const EntryPointContextProvider = createContext<{
  loading: boolean;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  authPresent: boolean;
}>({ loading: false, setLoading: () => {}, authPresent: false });
