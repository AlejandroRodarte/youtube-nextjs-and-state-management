import { useEffect } from 'react';
import Link from 'next/link';
import { useObservableState } from 'observable-hooks';

import useBehaviorSubjectValue from '@/lib/rxjs/use-behavior-subject-value.hook';
import useGlobalContext from '@/lib/rxjs/use-global-context.hook';

export default function Count() {
  const {
    subjectsConfigs,
    computedObservables,
    api: { rehydrateFromStorage },
  } = useGlobalContext();

  const pokemons = useBehaviorSubjectValue(
    subjectsConfigs.pokemon.pokemons.subject$
  );

  const filteredPokemons = useObservableState(
    computedObservables.pokemon.filteredPokemons$,
    pokemons
  )!;

  useEffect(() => {
    rehydrateFromStorage();
  }, [rehydrateFromStorage]);

  return (
    <div>
      <Link href="/">Home</Link>
      Filtered Pokemons: {filteredPokemons.length}
    </div>
  );
}
