import Link from 'next/link';
import { useAtomValue } from 'jotai';

import computedAtoms from '@/lib/jotai/computed-atoms.object';
import useSyncStorage from '@/lib/jotai/use-sync-storage.hook';

export default function Count() {
  // sync store atoms with storage
  useSyncStorage();

  // get derived atom value
  const pokemons = useAtomValue(computedAtoms.pokemon.filteredPokemons);

  return (
    <div>
      <Link href="/">Home</Link> Filtered Pokemons: {pokemons.length}
    </div>
  );
}
