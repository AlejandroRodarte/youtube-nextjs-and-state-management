import { useEffect } from 'react';
import Link from 'next/link';

import usePokemonStore from '@/lib/mobx/use-pokemon-store.hook';


export default function Count() {
  const {
    select,
    storage: { rehydrate: rehydrateStorage },
  } = usePokemonStore();

  const count = select((store) => store.filteredPokemons.length);

  useEffect(() => {
    rehydrateStorage();
  }, [rehydrateStorage]);

  return (
    <div>
      <Link href="/">Home</Link>Filtered Pokemons: {count}
    </div>
  );
}
