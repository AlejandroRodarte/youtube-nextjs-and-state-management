import getPokemonStore from './get-pokemon-store.helper';

// zustand store type definition, which varies depending on the setting (client or server)
// store.type being 'client' or 'server' serves as a discriminator to distinguish between
// the two versions of this store
export type PokemonStore = ReturnType<
  typeof getPokemonStore.onClient | typeof getPokemonStore.onServer
>;
