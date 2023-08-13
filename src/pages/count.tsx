import Link from 'next/link';
import usePokemonStore from '@/lib/zustand/use-pokemon-store.hook';

// sample /count page to demonstrate features that are only triggered
// when jumping between pages
export default function Count() {
  const count = usePokemonStore((state) => state.filteredPokemons.length);
  return (
    <div>
      <Link href="/">Home</Link>
      Filtered Pokemons: {count}
    </div>
  );
}
