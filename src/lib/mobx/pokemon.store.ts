import { computed, makeObservable, observable, runInAction } from 'mobx';

import { Pokemon } from '../interfaces/pokemon.interface';

class PokemonStore {
  public pokemons: Pokemon[] = [];
  public filter: string = '';

  constructor(preloadedState?: Partial<PokemonState>) {
    if (preloadedState) {
      if (preloadedState.filter) this.filter = preloadedState.filter;
      if (preloadedState.pokemons) this.pokemons = preloadedState.pokemons;
    }

    makeObservable(this, {
      pokemons: observable,
      filter: observable,
      filteredPokemons: computed,
    });
  }

  public getState(): PokemonState {
    return { filter: this.filter, pokemons: this.pokemons };
  }

  setPokemons = (pokemons: Pokemon[]) => {
    runInAction(() => {
      this.pokemons = pokemons;
    });
  };

  setFilter = (filter: string) => {
    runInAction(() => {
      this.filter = filter;
    });
  };

  get filteredPokemons(): Pokemon[] {
    return this.pokemons.filter((p) =>
      p.name.toLowerCase().includes(this.filter.toLowerCase())
    );
  }
}

type PokemonState = Pick<PokemonStore, 'filter' | 'pokemons'>;

const pokemonStore = new PokemonStore();

export { pokemonStore as default, type PokemonState, PokemonStore };
