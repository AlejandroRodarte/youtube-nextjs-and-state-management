import { useContext } from 'react';

import { PokemonStore } from './pokemon.store';
import PokemonContext from './pokemon.context';

const usePokemonStore = <T>(selector: (store: PokemonStore) => T) => {
  const store = useContext(PokemonContext);
  if (!store) throw new Error('store not configured');
  const result = selector(store);
  return result;
};

export default usePokemonStore;
