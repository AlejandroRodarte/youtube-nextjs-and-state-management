import {
  FC,
  ReactNode,
  createContext,
  useContext,
  useMemo,
  useState,
} from 'react';
import { GetServerSideProps } from 'next';
import { Pokemon } from '../interfaces/pokemon.interface';

export const getServerSideProps: GetServerSideProps<{
  pokemons: Pokemon[];
}> = async () => {
  const response = await fetch(
    'http://jherr-pokemon.s3.us-west-1.amazonaws.com/index.json'
  );
  const pokemons = (await response.json()) as Pokemon[];

  return { props: { pokemons } };
};

interface UsePokemonStoreApi {
  filter: {
    value: string;
    set: (value: string | ((prev: string) => string)) => void;
  };
  pokemons: Pokemon[];
}

export const usePokemonStore = (pokemons: Pokemon[]): UsePokemonStoreApi => {
  const [filter, setFilter] = useState('');
  const filteredPokemons = useMemo(() => {
    return !pokemons
      ? []
      : pokemons.filter((pokemon) =>
          pokemon.name.toLowerCase().includes(filter.toLowerCase())
        );
  }, [pokemons, filter]);

  return {
    filter: { value: filter, set: setFilter },
    pokemons: filteredPokemons,
  };
};

const PokemonStoreContext = createContext<UsePokemonStoreApi>({
  filter: { value: '', set: () => {} },
  pokemons: [],
});

interface PokemonStoreContextProviderProps {
  pokemons: Pokemon[];
  children: ReactNode;
}

export const PokemonStoreContextProvider: FC<
  PokemonStoreContextProviderProps
> = (props) => {
  const pokemonStore = usePokemonStore(props.pokemons);
  return (
    <PokemonStoreContext.Provider value={pokemonStore}>
      {props.children}
    </PokemonStoreContext.Provider>
  );
};

export const usePokemonStoreContext = () => useContext(PokemonStoreContext);
