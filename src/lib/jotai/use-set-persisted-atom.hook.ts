import { useSetAtom } from 'jotai';

import createPersistenceAtoms from './create-persistence-atoms.helper';

interface Options<T> {
  atoms: ReturnType<typeof createPersistenceAtoms<T>>;
}

type Returns<T> = (update: T | ((prev: T) => T)) => void;

// use persisted atom setter (sets store atom value and saves to local storage)
const useSetPersistedAtom = <T>(options: Options<T>): Returns<T> => {
  const setPersistedAtom = useSetAtom(options.atoms.persist);
  return setPersistedAtom;
};

export default useSetPersistedAtom;
