import { atom } from 'jotai';

import { IS_SERVER } from '../constants/is-server.constant';

interface Options<T> {
  store: {
    initialValue: T;
  };
  persist: {
    key: string;
  };
}

// helper to create two atoms: (1) atom for component access (store atom), and
// (2) atom for persistence with local storage (persist atom)
const createPersistenceAtoms = <T>(options: Options<T>) => {
  // primitive atom: store atom definition
  const storeAtom = atom<T>(options.store.initialValue);

  // get saved store atom value from local storage (or null if doesn't exist)
  const initialStorageValue = IS_SERVER
    ? null
    : localStorage.getItem(options.persist.key) ?? null;

  // (1) derived atom: persist atom definition
  // (2) getter: parsed version of saved store atom value (or null if doesn't exist)
  // (3) setter: set store atom with new value and persist it to local storage
  const persistAtom = atom(
    initialStorageValue ? (JSON.parse(initialStorageValue) as T) : null,
    (get, set, update: T | ((prev: T) => T)) => {
      const newValue =
        update instanceof Function ? update(get(storeAtom)) : update;
      set(storeAtom, newValue);
      localStorage.setItem(options.persist.key, JSON.stringify(newValue));
    }
  );

  return { store: storeAtom, persist: persistAtom };
};

export default createPersistenceAtoms;
