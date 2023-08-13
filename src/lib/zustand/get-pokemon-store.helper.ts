import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { computed } from 'zustand-computed';

import {
  PokemonFullState,
  PokemonState,
  PokemonStateWithoutFunctions,
} from './pokemon.state';
import initialState from './initial-state.object';
import computeState from './compute-state.helper';

// function to generate the full state creator function
const createComputedStateCreator = (
  preloadedState?: Partial<PokemonStateWithoutFunctions>
) => {
  // state creator function for non-computed properties
  const stateCreator = (
    set: (
      partial:
        | PokemonState
        | Partial<PokemonState>
        | ((state: PokemonState) => PokemonState | Partial<PokemonState>),
      replace?: boolean | undefined
    ) => void,
    get: () => PokemonFullState
  ): PokemonState => ({
    ...initialState,
    ...preloadedState,
    setPokemons: (pokemons) => set({ pokemons }),
    setFilter: (filter) => set({ filter }),
  });

  // wrap both state creator (handler and computeState) with the computed() middleware
  const computedStateCreator = computed(stateCreator, computeState);
  return computedStateCreator;
};

// create a zustand store...
const getPokemonStore = {
  // ...for the client
  onClient: (preloadedState?: Partial<PokemonStateWithoutFunctions>) => {
    const computedStateCreator = createComputedStateCreator(preloadedState);
    return {
      type: 'client' as const,
      // (1) zustand store will be persisted into local storage so it doesn't dissappear
      // after a page refresh, meaning we require the persist() middleware
      // (2) { skipHydration: true } is required to avoid hydration errors,
      // please visit https://github.com/pmndrs/zustand/issues/938 for more information on it
      instance: create<PokemonState>()(
        persist(computedStateCreator, {
          name: 'pokemon-storage',
          skipHydration: true,
        })
      ),
    };
  },
  // ...for the server: persist() middleware is not needed
  onServer: (preloadedState?: Partial<PokemonStateWithoutFunctions>) => {
    const computedStateCreator = createComputedStateCreator(preloadedState);
    return {
      type: 'server' as const,
      instance: create<PokemonState>()(computedStateCreator),
    };
  },
};

export default getPokemonStore;
