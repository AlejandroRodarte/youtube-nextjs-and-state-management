import { createStore } from 'jotai';

import { AtomsState } from '../interfaces/atoms-state.interface';
import { DeepPartial } from '../types/deep-partial.type';
import atoms from '@/lib/jotai/atoms.object';

// (1) utility function to set store atoms with ssr/ssg data
// (2) accepts a deeply-partial preloaded-state object that matches the current atoms state
const hydrateAtoms = (
  store: ReturnType<typeof createStore>,
  preloadedState?: DeepPartial<AtomsState>
) => {
  // no ssr/ssg data: no-op
  if (!preloadedState) return;

  if (preloadedState.pokemon) {
    // there are pokemons: set pokemon.pokemons store atom
    if (preloadedState.pokemon.pokemons)
      store.set(atoms.pokemon.pokemons.store, preloadedState.pokemon.pokemons);
  }
};

export default hydrateAtoms;
