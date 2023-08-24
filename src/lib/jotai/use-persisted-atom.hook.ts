import { useAtomValue, useSetAtom } from 'jotai';

import createPersistenceAtoms from './create-persistence-atoms.helper';

interface Options<T> {
  atoms: ReturnType<typeof createPersistenceAtoms<T>>;
}

type Returns<T> = [T, (update: T | ((prev: T) => T)) => void];

// utility hook to use a persisted atom: store atom value and persist atom setter
const usePersistedAtom = <T>(options: Options<T>): Returns<T> => {
  // store atom value and persist atom setter
  const storeAtomValue = useAtomValue(options.atoms.store);
  const setPersistAtom = useSetAtom(options.atoms.persist);
  return [storeAtomValue, setPersistAtom];
};

export default usePersistedAtom;
