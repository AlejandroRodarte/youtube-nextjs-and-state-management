import { useContext } from 'react';

import GlobalContext from './global.context';

// utility hook to check context exists
const useGlobalContext = () => {
  const ctx = useContext(GlobalContext);
  if (!ctx) throw new Error('context is not defined');
  return ctx;
};

export default useGlobalContext;
