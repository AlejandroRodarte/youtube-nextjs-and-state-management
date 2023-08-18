import { Pokemon } from '@/lib/interfaces/pokemon.interface';

// interface that describes the pokemon slice object
export interface PokemonState {
  pokemons: Pokemon[];
  search: string;
  pending: boolean;
  error: boolean;
}
