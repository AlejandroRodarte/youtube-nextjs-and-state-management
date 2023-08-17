import { action, computed, makeObservable, observable } from 'mobx';
import { persist } from 'mobx-persist';

import { Pokemon } from '../interfaces/pokemon.interface';

export interface PokemonState {
  pokemons: Pokemon[];
  filter: string;
}

export class PokemonStore {
  @persist('list')
  @observable
  public pokemons: PokemonState['pokemons'] = [];

  @persist
  @observable
  public filter: PokemonState['filter'] = '';

  constructor(preloadedState?: Partial<PokemonState>) {
    if (preloadedState) {
      if (preloadedState.filter) this.filter = preloadedState.filter;
      if (preloadedState.pokemons) this.pokemons = preloadedState.pokemons;
    }

    makeObservable(this);
  }

  public getState(): PokemonState {
    return { filter: this.filter, pokemons: this.pokemons };
  }

  @action
  setPokemons = (pokemons: Pokemon[]) => {
    this.pokemons = pokemons;
  };

  @action
  setFilter = (filter: string) => {
    this.filter = filter;
  };

  @action
  rehydrate = (partialState: Partial<PokemonState>) => {
    if (partialState.filter) this.filter = partialState.filter;
    if (partialState.pokemons) this.pokemons = partialState.pokemons;
  };

  @computed
  get filteredPokemons(): Pokemon[] {
    return this.pokemons.filter((p) =>
      p.name.toLowerCase().includes(this.filter.toLowerCase())
    );
  }
}
