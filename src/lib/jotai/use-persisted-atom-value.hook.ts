import { useAtomValue } from 'jotai';

import createPersistenceAtoms from './create-persistence-atoms.helper';

interface Options<T> {
  atoms: ReturnType<typeof createPersistenceAtoms<T>>;
}

// use persisted atom value (store atom value)
const usePersistedAtomValue = <T>(options: Options<T>): T => {
  const storeAtomValue = useAtomValue(options.atoms.store);
  return storeAtomValue;
};

export default usePersistedAtomValue;
