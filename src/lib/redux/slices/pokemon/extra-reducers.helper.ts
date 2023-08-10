import { ActionReducerMapBuilder } from '@reduxjs/toolkit';

import { PokemonState } from './pokemon-state.interface';
import { getPokemons } from './async-thunks/get-pokemons.async-thunk';

// extra case reducers to handle pending/fulfilled/rejected actions dispatched
// by async thunks (pokemon/getPokemons)
const extraReducers = (builder: ActionReducerMapBuilder<PokemonState>) => {
  builder
    // pending state: set pending flag
    .addCase(getPokemons.pending, (state) => {
      state.pending = true;
    })
    // fulfulled state: only state that receives the 'GetPokemonsPayload' object
    // in action.payload. Clear pending flag and set pokemons list and filtered list
    .addCase(getPokemons.fulfilled, (state, action) => {
      state.pending = false;
      state.pokemons = action.payload.pokemons;
      state.filteredPokemons = action.payload.pokemons;
    })
    // rejected state: clear pending flag and set error flag
    .addCase(getPokemons.rejected, (state) => {
      state.pending = false;
      state.error = true;
    });
};

export default extraReducers;
