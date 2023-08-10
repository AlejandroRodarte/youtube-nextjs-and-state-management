import { createSlice } from '@reduxjs/toolkit';

import initialState from './initial-state.object';
import setSearch from './reducers/set-search.reducer';
import extraReducers from './extra-reducers.helper';
import { SLICE_NAME } from './slice-name.constant';

// the store slice object itself
// (1) give it a name
// (2) give it an initial state to start with
// (3) give it a reducer with the action definitions
// (4) give it the extra reducers with async-thunk-related actions
const pokemonSlice = createSlice({
  name: SLICE_NAME,
  initialState,
  reducers: {
    setSearch,
  },
  extraReducers,
});

const actions = pokemonSlice.actions;

// export not only the slice object itself, but the actions as they will
// come in handy later on when creating action objects
export { pokemonSlice as default, actions };
