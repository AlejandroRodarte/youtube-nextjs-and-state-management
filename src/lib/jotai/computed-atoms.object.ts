import { atom } from 'jotai';

import atoms, { POKEMON_MODULE_NAME } from './atoms.object';

// computed (derived, read-only) atoms
const computedAtoms = {
  [POKEMON_MODULE_NAME]: {
    filteredPokemons: atom((get) =>
      get(atoms.pokemon.pokemons.store).filter((p) =>
        p.name
          .toLowerCase()
          .includes(get(atoms.pokemon.filter.store).toLowerCase())
      )
    ),
  },
};

export default computedAtoms;
