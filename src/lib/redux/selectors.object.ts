import { createSelector } from '@reduxjs/toolkit';

import { Pokemon } from '@/lib/interfaces/pokemon.interface';
import { RootState } from './root-state.type';

type Selectors<ReturnTypes> = {
  [SelectorKey in keyof ReturnTypes]: (
    state: RootState
  ) => ReturnTypes[SelectorKey];
};

interface SelectorReturnTypes {
  getSearch: string;
  getPokemons: Pokemon[];
  getFilteredPokemons: Pokemon[];
  getFilteredPokemonsAmount: number;
}

// regular selectors
const getSearch = (state: RootState) => state.pokemon.search;
const getPokemons = (state: RootState) => state.pokemon.pokemons;

// computed (memoized) selectors
const getFilteredPokemons = createSelector(
  [getSearch, getPokemons],
  (search, pokemons) =>
    pokemons.filter((p) => p.name.toLowerCase().includes(search.toLowerCase()))
);

const getFilteredPokemonsAmount = createSelector(
  [getFilteredPokemons],
  (pokemons) => pokemons.length
);

// use them with useAppSelector() from 'react-redux'
const selectors: Selectors<SelectorReturnTypes> = {
  getSearch,
  getPokemons,
  getFilteredPokemons,
  getFilteredPokemonsAmount,
};

export default selectors;
