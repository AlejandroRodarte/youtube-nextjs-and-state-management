import { PokemonState } from './pokemon-state.interface';

// initial pokemon slice state
const initialState: PokemonState = {
  pokemons: [],
  filteredPokemons: [],
  search: '',
  pending: false,
  error: false,
};

export default initialState;
