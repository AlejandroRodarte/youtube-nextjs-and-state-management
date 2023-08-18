import { RootState } from './root-state.type';
import createPokemonInitialState from './slices/pokemon/create-initial-pokemon-state.helper';

// initial root state factory
const createInitialRootState = (): RootState => ({
  pokemon: createPokemonInitialState(),
});

export default createInitialRootState;
