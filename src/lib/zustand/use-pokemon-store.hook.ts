import { useContext } from 'react';
import { PokemonFullState } from './pokemon.state';
import { PokemonContext } from './pokemon.context';

// (1) hook to connect from our components to the zustand store ans grab data
// (2) this hook is called in BOTH server-side and client-side
const usePokemonStore = <T>(selector: (state: PokemonFullState) => T) => {
  // grab zustand store instance from context
  const store = useContext(PokemonContext);
  if (!store) throw new Error('store not configured');
  // use the selector to get the data we want from the zustand store
  const result = store.instance(selector);
  return result;
};

export default usePokemonStore;
