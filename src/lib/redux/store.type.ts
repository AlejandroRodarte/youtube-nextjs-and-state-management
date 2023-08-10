import { ToolkitStore } from '@reduxjs/toolkit/dist/configureStore';
import { AnyAction, ThunkMiddleware } from '@reduxjs/toolkit';

import { RootState } from './root-state.type';

// return type from calling configureStore() with our current setup
// may require modification as we alter it
export type Store = ToolkitStore<
  RootState,
  AnyAction,
  [ThunkMiddleware<RootState, AnyAction>]
>;
