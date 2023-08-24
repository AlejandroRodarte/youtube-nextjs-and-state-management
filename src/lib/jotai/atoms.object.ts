import { Pokemon } from '../interfaces/pokemon.interface';
import createPersistenceAtoms from './create-persistence-atoms.helper';

export const POKEMON_MODULE_NAME = 'pokemon';

// our main atoms object
const atoms = {
  [POKEMON_MODULE_NAME]: {
    // pokemon.pokemons: list of pokemons, saved with key "pokemon/pokemons"
    pokemons: createPersistenceAtoms<Pokemon[]>({
      store: {
        initialValue: [],
      },
      persist: {
        key: `${POKEMON_MODULE_NAME}/pokemons`,
      },
    }),
    // pokemon.filter: pokemons search filter, saved with key "pokemon/filter"
    filter: createPersistenceAtoms<string>({
      store: {
        initialValue: '',
      },
      persist: {
        key: `${POKEMON_MODULE_NAME}/filter`,
      },
    }),
  },
};

export default atoms;
