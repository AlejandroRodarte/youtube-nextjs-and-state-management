import { CaseReducers, ReducerThis } from '../case-reducers.type';

type Args = Parameters<CaseReducers['rehydrate']>;
type State = Args[0];
type Action = Args[1];

export default function rehydrate(
  this: ReducerThis,
  state: State,
  action: Action
): ReturnType<CaseReducers['setSearch']> {
  state.error = action.payload.error;
  state.pending = action.payload.pending;
  state.pokemons = action.payload.pokemons;
  state.filteredPokemons = action.payload.filteredPokemons;
  state.search = action.payload.search;
}
