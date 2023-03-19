import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type { PokemonProps as Pokemon } from './Pokemon';

export const pokedexApi = createApi({
  reducerPath: 'pokedexApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://pokeapi.co/api/v2/' }),
  endpoints: builder => ({
    getPokemonList: builder.query<Pokemon[], number>({
      query: limit => `pokemon?limit=${limit}`,
    }),
  }),
});

export const { useGetPokemonListQuery } = pokedexApi;
