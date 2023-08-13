import { PokemonComputedState, PokemonState } from './pokemon.state';

// state creator function for computed properties
const computedStateCreator = (state: PokemonState): PokemonComputedState => ({
  filteredPokemons: state.pokemons.filter((pokemon) =>
    pokemon.name.toLowerCase().includes(state.filter.toLowerCase())
  ),
});

export default computedStateCreator;
