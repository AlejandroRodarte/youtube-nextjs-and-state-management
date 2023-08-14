import { createContext } from 'react';

import { PokemonStore } from './pokemon.store';

const PokemonContext = createContext<PokemonStore | null>(null);

export default PokemonContext;
