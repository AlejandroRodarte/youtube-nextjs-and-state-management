import { Pokemon } from './pokemon.interface';

// atoms raw data state definition
export interface AtomsState {
  pokemon: {
    pokemons: Pokemon[];
    filter: string;
  };
}
