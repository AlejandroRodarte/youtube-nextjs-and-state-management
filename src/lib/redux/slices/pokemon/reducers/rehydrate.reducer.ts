import patchObject from '@/lib/helpers/patch-object.helper';
import { CaseReducers, ReducerThis } from '../case-reducers.type';

type Args = Parameters<CaseReducers['rehydrate']>;
type State = Args[0];
type Action = Args[1];

export default function rehydrate(
  this: ReducerThis,
  state: State,
  action: Action
): ReturnType<CaseReducers['setSearch']> {
  // merge current state (writable) with deeply-optional pokemon state
  patchObject(state, action.payload);
}
