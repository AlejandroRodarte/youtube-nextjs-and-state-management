import { configureStore } from '@reduxjs/toolkit';
import {
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
  persistReducer,
} from 'redux-persist';

import { RootState } from './root-state.type';
import rootReducer from './root-reducer.reducer';
import { DeepPartial } from '../types/deep-partial.type';
import createInitialRootState from './create-initial-root-state.helper';
import patchObject from '../helpers/patch-object.helper';
import { ROOT_STORAGE_KEY } from '../constants/root-storage-key.constant';

// create root state by merging initial root state and a deeply-optional root state object
const createPreloadedState = (
  preloadedState?: DeepPartial<RootState>
): RootState => {
  const initialRootState = createInitialRootState();
  if (preloadedState) patchObject(initialRootState, preloadedState);
  return initialRootState;
};

// redux store factory
const createStore = {
  // server-side store
  onServer: (preloadedState?: DeepPartial<RootState>) => ({
    type: 'server' as const,
    instance: configureStore({
      reducer: rootReducer,
      preloadedState: createPreloadedState(preloadedState),
    }),
  }),
  // client-side store
  onClient: (preloadedState?: DeepPartial<RootState>) => ({
    type: 'client' as const,
    instance: configureStore({
      // implements persistence to local storage
      reducer: persistReducer(
        {
          key: ROOT_STORAGE_KEY,
          storage: require('redux-persist/lib/storage').default,
        },
        rootReducer
      ),
      preloadedState: createPreloadedState(preloadedState),
      // ignore persistence-related actions (triggers warnings if not taken care of)
      middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
          serializableCheck: {
            ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
          },
        }),
    }),
  }),
};

export default createStore;
