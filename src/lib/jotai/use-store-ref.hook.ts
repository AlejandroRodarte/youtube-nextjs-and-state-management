import { useCallback, useRef } from 'react';
import { createStore } from 'jotai';

import { AtomsState } from '../interfaces/atoms-state.interface';
import { DeepPartial } from '../types/deep-partial.type';
import hydrateAtoms from './hydrate-atoms.helper';

// hook that initializes global-like data (jotai store and api for global context)
const useStoreRef = (preloadedState?: DeepPartial<AtomsState>) => {
  const storeRef = useRef<ReturnType<typeof createStore>>();

  // initialize store ref and hydrate atoms with ssr/ssg data (preloadedState)
  if (!storeRef.current) {
    storeRef.current = createStore();
    hydrateAtoms(storeRef.current, preloadedState);
  }

  // one-shot flag to hydrate atoms with storage once
  const hasSyncedWithStorage = useRef(false);

  return {
    refs: { storeRef },
    api: {
      hasSyncedWithStorage: {
        // (1) getter/setter for hasSyncedWithStorage one-shot flag
        // no dependencies so they shouldn'y trigger re-renders
        get: useCallback(() => hasSyncedWithStorage.current, []),
        set: useCallback((value: boolean | ((prev: boolean) => boolean)) => {
          hasSyncedWithStorage.current =
            value instanceof Function
              ? value(hasSyncedWithStorage.current)
              : value;
        }, []),
      },
    },
  };
};

export default useStoreRef;
