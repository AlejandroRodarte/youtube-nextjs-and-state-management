import { configureStore } from '@reduxjs/toolkit';

import { RootState } from './root-state.type';
import { Store } from './store.type';
import pokemonSlice from './slices/pokemon/pokemon.slice';
import { SLICE_NAME as POKEMON_SLICE_NAME } from './slices/pokemon/slice-name.constant';

// redux store generator:
// can accept an initial root state object that may come pre-populated from the server-side
export const getStore = (preloadedState?: RootState): Store => {
  return configureStore({
    reducer: {
      [POKEMON_SLICE_NAME]: pokemonSlice.reducer,
    },
    preloadedState,
  });
};
