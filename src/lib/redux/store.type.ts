import createStore from './create-store.helper';

// return type from either server-side store factory or
// client-side store factory
export type Store = ReturnType<
  typeof createStore.onClient | typeof createStore.onServer
>;
