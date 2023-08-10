import { createAsyncThunk } from '@reduxjs/toolkit';

import { Pokemon } from '@/lib/interfaces/pokemon.interface';
import { SLICE_NAME } from '../slice-name.constant';

export interface GetPokemonsPayload {
  pokemons: Pokemon[];
}

// create async tasks with createAsyncThunk()
// they require a prefix (pokemon/getPokemons)
// three actions are created total:
// (1) 'pokemon/getPokemons/pending' when async task isn't done yet
// (2) 'pokemon/getPokemons/rejected' when async task failed
// (3) 'pokemon/getPokemons/fulfilled' when async task succeeded
export const getPokemons = createAsyncThunk(
  `${SLICE_NAME}/getPokemons`,
  async (): Promise<GetPokemonsPayload> => {
    const response = await fetch(
      'https://jherr-pokemon.s3.us-west-1.amazonaws.com/index.json'
    );
    const json = await response.json();
    const pokemons = json as Pokemon[];
    return { pokemons };
  }
);
