import { combineLatest, map } from 'rxjs';

import createSubjectsConfigs from './create-subjects-configs.helper';

// computed values in rxjs can be represented by cold observers
const createComputedObservables = (
  createdSubjectsObject: ReturnType<typeof createSubjectsConfigs>['object']
) => {
  return {
    pokemon: {
      // behavior subject values that affect the computed property must be
      // allocated in the combineLatest([...]) function call
      filteredPokemons$: combineLatest([
        createdSubjectsObject.pokemon.pokemons.subject$,
        createdSubjectsObject.pokemon.filter.subject$,
      ]).pipe(
        map(([pokemons, filter]) =>
          pokemons.filter((p) =>
            p.name.toLowerCase().includes(filter.toLowerCase())
          )
        )
      ),
    },
  };
};

export default createComputedObservables;
