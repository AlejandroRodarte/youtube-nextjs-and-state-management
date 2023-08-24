import { createContext } from 'react';

import useStoreRef from '../jotai/use-store-ref.hook';

// global context: exposes a simple api
const GlobalContext = createContext<
  ReturnType<typeof useStoreRef>['api'] | null
>(null);

export default GlobalContext;
