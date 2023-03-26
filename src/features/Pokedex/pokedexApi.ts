import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type { PokemonProps as Pokemon } from './Pokemon';

export interface Region {
  name: string;
  url: string;
}

export interface Type {
  name: string;
  url: string;
}

interface RegionResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: Region[];
}

interface TypeResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: Type[];
}

export const pokedexApi = createApi({
  reducerPath: 'pokedexApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://pokeapi.co/api/v2/' }),
  endpoints: builder => ({
    getPokemonList: builder.query<Pokemon[], number>({
      query: limit => `pokemon?limit=${limit}`,
    }),
    getRegionList: builder.query<RegionResponse, void>({
      query: () => 'region',
    }),
    getTypeList: builder.query<TypeResponse, void>({
      query: () => 'type',
      transformResponse: (response: RegionResponse) => {
        return {
          ...response,
          results: [{ name: 'All Types', url: '' }, ...response.results],
        };
      },
    }),
    getPokemon: builder.query<Pokemon, number | string>({
      query: IdOrName => `pokemon/${IdOrName}`,
    }),
    getRegion: builder.query<Region, number | string>({
      query: IdOrName => `region/${IdOrName}`,
    }),
  }),
});

export const {
  useGetPokemonListQuery,
  useGetRegionListQuery,
  useGetTypeListQuery,
} = pokedexApi;
