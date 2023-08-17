import { useEffect } from 'react';
import Link from 'next/link';

import usePokemonStore from '@/lib/zustand/use-pokemon-store.hook';

// sample /count page to demonstrate features that are only triggered
// when jumping between pages
export default function Count() {
  const api = usePokemonStore();

  const {
    select,
    storage: { rehydrate: rehydrateStorage },
  } = api;
  const count = select((state) => state.filteredPokemons.length);

  useEffect(() => {
    rehydrateStorage();
  }, [rehydrateStorage]);

  return (
    <div>
      <Link href="/">Home</Link>
      Filtered Pokemons: {count}
    </div>
  );
}
