import { Pokemon } from '../interfaces/pokemon.interface';
import { GetFunctionKeys } from '../types/get-function-keys.type';

// zustand state interface for non-computed properties
export interface PokemonState {
  pokemons: Pokemon[];
  filter: string;
  setPokemons: (pokemons: Pokemon[]) => void;
  setFilter: (filter: string) => void;
}

// zustand state interface for computed properties
export interface PokemonComputedState {
  filteredPokemons: Pokemon[];
}

// zustand state type without keys related to functions
export type PokemonStateWithoutFunctions = Omit<
  PokemonState,
  GetFunctionKeys<PokemonState>
>;

// zustand state type that includes both non-computed and computed properties
export type PokemonFullState = PokemonState & PokemonComputedState;
