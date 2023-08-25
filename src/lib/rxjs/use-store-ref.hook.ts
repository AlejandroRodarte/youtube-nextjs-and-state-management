import { useCallback, useRef } from 'react';

import { DeepPartial } from '../types/deep-partial.type';
import { State } from './state.interface';
import createComputedObservables from './create-computed-observables.helper';
import createSubjectsConfigs from './create-subjects-configs.helper';

// main hook that runs at _app.tsx
const useStoreRef = (preloadedState?: DeepPartial<State>) => {
  const subjectsConfigsRef = useRef<ReturnType<typeof createSubjectsConfigs>>();
  const computedObservablesRef =
    useRef<ReturnType<typeof createComputedObservables>>();

  // one-shot to hydrate subjects with data from storage once
  const hasSyncedWithStorage = useRef(false);

  // flag to set until client-side navigation begins
  const hasClientSideNavigationBegan = useRef(false);

  // create our subjects configs once on client and once on server based
  // on the preloaded state (SSR/SSG data)
  if (!subjectsConfigsRef.current)
    subjectsConfigsRef.current = createSubjectsConfigs(preloadedState);
  // if our ref is defined, it means client-side navigation is active
  else if (!hasClientSideNavigationBegan.current)
    hasClientSideNavigationBegan.current = true;

  // derive computed observables on subjects configs once on server
  // and once on client
  if (!computedObservablesRef.current)
    computedObservablesRef.current = createComputedObservables(
      subjectsConfigsRef.current.object
    );

  // api method 1: hydrate all subjects with data from storage system
  const rehydrateFromStorage = useCallback(() => {
    // use the list of subject configs (Storageable[]) to call syncWithStorageValue
    // and rehydrate all subjects one by one
    if (!hasSyncedWithStorage.current) {
      subjectsConfigsRef.current?.list.forEach((config) =>
        config.syncWithStorageValue()
      );
      hasSyncedWithStorage.current = true;
    }

    // if client-side navigation has NOT began yet (first client-side render),
    // connect our subjects to the storage system by looping the subjects configs and
    // calling startPersisting()
    if (!hasClientSideNavigationBegan.current) {
      subjectsConfigsRef.current?.list.forEach((config) =>
        config.startPersiting()
      );
    }
  }, []);

  // api method 2: disconnect all subjects from storage system (cleanup)
  // loop through all subjects and call stopPersisting()
  const stopAllPersistenceSubscriptions = useCallback(() => {
    subjectsConfigsRef.current?.list.forEach((config) =>
      config.stopPersisting()
    );
  }, []);

  return {
    subjectsConfigs: subjectsConfigsRef.current.object,
    computedObservables: computedObservablesRef.current,
    api: { rehydrateFromStorage, stopAllPersistenceSubscriptions },
  };
};

export default useStoreRef;
