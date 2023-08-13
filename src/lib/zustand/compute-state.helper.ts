import { PokemonComputedState, PokemonState } from './pokemon.state';

// state creator function for computed properties
const computeState = (state: PokemonState): PokemonComputedState => ({
  filteredPokemons: state.pokemons.filter((pokemon) =>
    pokemon.name.toLowerCase().includes(state.filter.toLowerCase())
  ),
});

export default computeState;
