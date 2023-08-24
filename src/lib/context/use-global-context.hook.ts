import { useContext } from 'react';

import GlobalContext from './global.context';

// utility hook to verify context exists
const useGlobalContext = () => {
  const api = useContext(GlobalContext);
  if (!api) throw new Error('context is not defined');
  return api;
};

export default useGlobalContext;
