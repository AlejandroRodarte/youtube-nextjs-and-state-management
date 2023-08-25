import { createContext } from 'react';

import useStoreRef from './use-store-ref.hook';

// global context: holds what useStoreRef() returns (the subjects configs object,
// computed observables, and the API to hydrate our subjects with storage and connect to it)
const GlobalContext = createContext<ReturnType<typeof useStoreRef> | null>(
  null
);

export default GlobalContext;
