import { createContext } from 'react';

import { UseStoreRefApi } from './use-store-ref.hook';

const PokemonContext = createContext<UseStoreRefApi | null>(null);

export default PokemonContext;
