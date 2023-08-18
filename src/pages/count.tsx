import Link from 'next/link';

import useStoreContext from '@/lib/redux/use-store-context.hook';
import { useAppSelector } from '@/lib/redux/use-app-selector.hook';
import selectors from '@/lib/redux/selectors.object';
import { useEffect } from 'react';

export default function Count() {
  const {
    storage: { rehydrate: rehydrateStorage },
  } = useStoreContext();

  const count = useAppSelector(selectors.getFilteredPokemonsAmount);

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
