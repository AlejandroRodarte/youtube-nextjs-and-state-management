import createPokemonStore from './create-pokemon-store.helper';

export type PokemonServerStore = ReturnType<typeof createPokemonStore.onServer>;
export type PokemonClientStore = ReturnType<typeof createPokemonStore.onClient>;

// zustand store type definition, which varies depending on the setting (client or server)
// store.type being 'client' or 'server' serves as a discriminator to distinguish between
// the two versions of this store
export type PokemonStore = PokemonServerStore | PokemonClientStore;
