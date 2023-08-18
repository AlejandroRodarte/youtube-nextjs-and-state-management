import { createContext } from 'react';

import useStoreRef from './use-store-ref.hook';

// custom store context: injects an API to perform storage and
// manual re-hydration processes
const StoreContext = createContext<
  ReturnType<typeof useStoreRef>['api'] | null
>(null);

export default StoreContext;
