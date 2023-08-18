import { useContext } from 'react';

import StoreContext from './store-context.context';

// utility hook to check context is defined
const useStoreContext = () => {
  const api = useContext(StoreContext);
  if (!api) throw new Error('context not found');
  return api;
};

export default useStoreContext;
