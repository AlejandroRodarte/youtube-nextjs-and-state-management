import { PokemonState } from './slices/pokemon/pokemon-state.interface';
import { SLICE_NAME as POKEMON_SLICE_NAME } from './slices/pokemon/slice-name.constant';

// root state type: here we describe all slice state types
export type RootState = {
  [POKEMON_SLICE_NAME]: PokemonState;
};
