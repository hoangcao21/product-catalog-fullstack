import { authUtils, CREDENTIALS_CHANGED_EVENT } from '../utils/auth';
import { useCallback, useEffect, useState } from 'react';

export interface Auth {
  isValid: boolean;
  setValid: () => void;
}

export const useAuth = (): Auth => {
  const isCredentialsSet: boolean = authUtils.isCredentialsPresent();

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [_, setRefreshOnDemand] = useState(false); // Toggle state

  const refresh = useCallback(() => {
    setRefreshOnDemand((prev) => !prev);
  }, [setRefreshOnDemand]);

  useEffect(() => {
    window.addEventListener(CREDENTIALS_CHANGED_EVENT, refresh);

    return () => {
      window.removeEventListener(CREDENTIALS_CHANGED_EVENT, refresh);
    };
  }, [refresh]);

  return {
    isValid: isCredentialsSet,
    setValid: authUtils.setCredentialsPresent,
  };
};
