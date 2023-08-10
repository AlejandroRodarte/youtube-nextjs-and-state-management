import { Pokemon } from '@/lib/interfaces/pokemon.interface';
import { RootState } from './root-state.type';

type Selectors<ReturnTypes> = {
  [SelectorKey in keyof ReturnTypes]: (
    state: RootState
  ) => ReturnTypes[SelectorKey];
};

interface SelectorReturnTypes {
  getSearch: string;
  getFilteredPokemons: Pokemon[];
}

// handy selector callbacks to use with useAppSelector() from 'react-redux'
const selectors: Selectors<SelectorReturnTypes> = {
  getSearch: (state: RootState) => state.pokemon.search,
  getFilteredPokemons: (state: RootState) => state.pokemon.filteredPokemons,
};

export default selectors;
