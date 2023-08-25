import { BehaviorSubjectWithStorage } from './behavior-subject-with-storage';
import { DeepPartial } from '../types/deep-partial.type';
import { State } from './state.interface';
import { Storageable } from './storageable.interface';

// (1) utility helper to create our behavior subject configurations, which can be
// initialized with a preloadedState object (SSR/SSG data)
// (2) the function returns the same instances in two formats: object format and list format
const createSubjectsConfigs = (preloadedState?: DeepPartial<State>) => {
  // the object format is for common access (in components and when creating computed properties)
  const object = {
    pokemon: {
      pokemons: new BehaviorSubjectWithStorage({
        initialValue: preloadedState?.pokemon?.pokemons ?? [],
        storageKey: 'pokemon/pokemons',
      }),
      filter: new BehaviorSubjectWithStorage({
        initialValue: preloadedState?.pokemon?.filter ?? '',
        storageKey: 'pokemon/filter',
      }),
    },
  };

  // (1) the list format, however, is used to loop through the instances and call
  // the methods they share (syncWithStorageValue, startPersisting, stopPersisting)
  // (2) this list is primarily used in our useStoreRef() hook to have more compact API callbacks
  // when hydrating and connecting our subjects to the storage system
  const list: Storageable[] = [object.pokemon.pokemons, object.pokemon.filter];

  return { object, list };
};

export default createSubjectsConfigs;
