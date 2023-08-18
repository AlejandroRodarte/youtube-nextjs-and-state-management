import { CaseReducers, ReducerThis } from '../case-reducers.type';

// from setSearch's case reducer function signature, extract tuple with arg types
type Args = Parameters<CaseReducers['setSearch']>;
type State = Args[0];
type Action = Args[1];

// case reducers are functions that get called with a (1) mutable state and
// an (2) action object tied to the case reducer that will mutate the state
export default function setSearch(
  this: ReducerThis,
  state: State,
  action: Action
): ReturnType<CaseReducers['setSearch']> {
  state.search = action.payload.value;
}
