import { useEffect } from 'react';

import atoms from '@/lib/jotai/atoms.object';
import useGlobalContext from '../context/use-global-context.hook';
import useSyncAtomWithStorage from './use-sync-atom-with-storage.hook';

// custom hook to run a useEffect() code once to sync all store atoms with local storage data
const useSyncStorage = () => {
  // get hasSyncedWithStorage's one-shot api
  const {
    hasSyncedWithStorage: { get: getFlag, set: setFlag },
  } = useGlobalContext();

  // get helpers for each store atom
  const syncPokemonsWithStorage = useSyncAtomWithStorage({
    atoms: atoms.pokemon.pokemons,
  });
  const syncFilterWithStorage = useSyncAtomWithStorage({
    atoms: atoms.pokemon.filter,
  });

  // run helpers for each store atom once
  useEffect(() => {
    if (getFlag()) return;
    syncPokemonsWithStorage();
    syncFilterWithStorage();
    setFlag(true);
  }, [syncPokemonsWithStorage, syncFilterWithStorage, getFlag, setFlag]);
};

export default useSyncStorage;
