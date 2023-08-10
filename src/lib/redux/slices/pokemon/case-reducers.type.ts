import {
  Draft,
  PayloadAction,
  ValidateSliceCaseReducers,
} from '@reduxjs/toolkit';

import { PokemonState } from './pokemon-state.interface';

// payload for actions.setSearch()
interface SetSearch {
  value: string;
}

// typing for 'this' which is common for all case reducers
export type ReducerThis = ValidateSliceCaseReducers<
  PokemonState,
  ValidateSliceCaseReducers<PokemonState, CaseReducers>
>;

// type definition for case reducers
export type CaseReducers = {
  // signature for actions.rehydrate()
  rehydrate: (
    this: ReducerThis,
    state: Draft<PokemonState>,
    action: PayloadAction<PokemonState>
  ) => void;
  // signature for actions.setSearch()
  setSearch: (
    this: ReducerThis,
    state: Draft<PokemonState>,
    action: PayloadAction<SetSearch>
  ) => void;
};
