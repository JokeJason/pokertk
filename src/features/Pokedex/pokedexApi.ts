import {
  createApi,
  FetchArgs,
  fetchBaseQuery,
} from '@reduxjs/toolkit/query/react';
import type { PokemonProps as Pokemon } from './Pokemon';
import {
  pokeApiAllPagesCustomBaseQuery,
  pokeApiFullListFetchArgs,
} from './paginationBaseQuery';

export interface Region {
  name: string;
  url: string;
}

export interface Type {
  name: string;
  url: string;
}

export interface PokemonListResponse {
  count: number;
  results: Pokemon[];
}

export interface RegionListResponse {
  count: number;
  results: Region[];
}

export interface TypeListResponse {
  count: number;
  results: Type[];
}

const pokeApiBaseQuery = async (
  args: pokeApiFullListFetchArgs,
  api: any,
  extra: any,
) => {
  const baseUrl = 'https://pokeapi.co/api/v2/';

  if (args.fetchAllPages) {
    return pokeApiAllPagesCustomBaseQuery(args, api, extra, baseUrl);
  } else {
    return fetchBaseQuery({ baseUrl })(args, api, extra);
  }
};

export const pokedexApi = createApi({
  reducerPath: 'pokedexApi',
  baseQuery: pokeApiBaseQuery,
  endpoints: builder => ({
    getPokemonList: builder.query<PokemonListResponse, void>({
      query: () => ({ url: `pokemon`, fetchAllPages: true }),
    }),
    getRegionList: builder.query<RegionListResponse, void>({
      query: () => ({ url: 'region', fetchAllPages: true }),
    }),
    getTypeList: builder.query<TypeListResponse, void>({
      query: () => ({ url: 'type', fetchAllPages: true }),
      transformResponse: (response: RegionListResponse) => {
        return {
          ...response,
          results: [{ name: 'All Types', url: '' }, ...response.results],
        };
      },
    }),
    getPokemon: builder.query<Pokemon, number | string>({
      query: IdOrName => ({ url: `pokemon/${IdOrName}` }),
    }),
    getRegion: builder.query<Region, number | string>({
      query: IdOrName => ({ url: `region/${IdOrName}` }),
    }),
    getType: builder.query<Type, number | string>({
      query: IdOrName => ({ url: `type/${IdOrName}` }),
    }),
  }),
});

export const {
  useGetPokemonListQuery,
  useGetRegionListQuery,
  useGetTypeListQuery,
  useGetPokemonQuery,
  useGetRegionQuery,
  useGetTypeQuery,
} = pokedexApi;
