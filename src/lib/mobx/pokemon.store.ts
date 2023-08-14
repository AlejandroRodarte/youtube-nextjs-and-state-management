import { computed, makeObservable, observable, runInAction } from 'mobx';
import { Pokemon } from '../interfaces/pokemon.interface';

class PokemonStore {
  public pokemons: Pokemon[] = [];
  public filter: string = '';

  constructor() {
    makeObservable(this, {
      pokemons: observable,
      filter: observable,
      filteredPokemons: computed,
    });
  }

  public setPokemons(pokemons: Pokemon[]) {
    runInAction(() => {
      this.pokemons = pokemons;
    });
  }

  public setFilter(filter: string) {
    runInAction(() => {
      this.filter = filter;
    });
  }

  get filteredPokemons() {
    return this.pokemons.filter((p) =>
      p.name.toLowerCase().includes(this.filter.toLowerCase())
    );
  }
}

type PokemonState = Pick<PokemonStore, 'filter' | 'pokemons'>;

const pokemonStore = new PokemonStore();

export { pokemonStore as default, type PokemonState, PokemonStore };
