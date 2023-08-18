import { combineReducers } from 'redux';

import pokemonSlice from './slices/pokemon/pokemon.slice';
import { SLICE_NAME as POKEMON_SLICE_NAME } from './slices/pokemon/slice-name.constant';

// root reducer definition
const rootReducer = combineReducers({
  [POKEMON_SLICE_NAME]: pokemonSlice.reducer,
});

export default rootReducer;
