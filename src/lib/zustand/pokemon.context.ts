import { createContext } from 'react';

import { PokemonStore } from './pokemon-store.type';

// our zustand context, which simply holds a zustand store instance
export const PokemonContext = createContext<PokemonStore | null>(null);
