import { PokemonStateWithoutFunctions } from './pokemon.state';

// initial zustand state values (discarding functions)
const initialState: PokemonStateWithoutFunctions = {
  pokemons: [],
  filter: '',
};

export default initialState;
