import { useAtomValue, useSetAtom } from 'jotai';
import { useCallback } from 'react';

import createPersistenceAtoms from './create-persistence-atoms.helper';

interface Options<T> {
  atoms: ReturnType<typeof createPersistenceAtoms<T>>;
}

// utility hook that creates a function to sync a store atom value with its
// saved value in local storage
const useSyncAtomWithStorage = <T>(options: Options<T>): (() => void) => {
  // store atom setter
  const setStoreAtom = useSetAtom(options.atoms.store);

  // persist atom value
  const persistedAtomValue = useAtomValue(options.atoms.persist);

  // (1) main helper function: if there was data saved in local storage, use data to
  // set store atom value
  // (2) persistedAtomValue never changes, and setStoreAtom also never changes
  const syncStoreAtomWithStorage = useCallback(() => {
    if (persistedAtomValue) setStoreAtom(persistedAtomValue);
  }, [persistedAtomValue, setStoreAtom]);

  return syncStoreAtomWithStorage;
};

export default useSyncAtomWithStorage;
