import { Pokemon } from '../interfaces/pokemon.interface';

// interface that provides a form to our raw data
export interface State {
  pokemon: {
    pokemons: Pokemon[];
    filter: string;
  };
}
