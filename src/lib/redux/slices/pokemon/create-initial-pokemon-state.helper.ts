import { PokemonState } from './pokemon-state.interface';

// initial pokemon slice state factory
const createInitialPokemonState = (): PokemonState => ({
  pokemons: [],
  search: '',
  pending: false,
  error: false,
});

export default createInitialPokemonState;
