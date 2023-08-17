import { useContext } from 'react';

import { PokemonContext } from './pokemon.context';

const usePokemonStore = () => {
  const api = useContext(PokemonContext);
  if (!api) throw new Error('context not found');
  return api;
};

export default usePokemonStore;
