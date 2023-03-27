import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import {
  pokeApiAllPagesCustomBaseQuery,
  pokeApiFullListFetchArgs,
} from './paginationBaseQuery';
import {
  PokemonListResponseData,
  PokemonResponseData,
  RegionListResponseData,
  RegionResponseData,
  TypeListResponseData,
  TypeResponseData,
} from './types/api';

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
    getPokemonList: builder.query<PokemonListResponseData, void>({
      query: () => ({ url: `pokemon`, fetchAllPages: true }),
    }),
    getRegionList: builder.query<RegionListResponseData, void>({
      query: () => ({ url: 'region', fetchAllPages: true }),
    }),
    getTypeList: builder.query<TypeListResponseData, void>({
      query: () => ({ url: 'type', fetchAllPages: true }),
      transformResponse: (response: RegionListResponseData) => {
        return {
          ...response,
          results: [{ name: 'All Types', url: '' }, ...response.results],
        };
      },
    }),
    getPokemon: builder.query<PokemonResponseData, number | string>({
      query: IdOrName => ({ url: `pokemon/${IdOrName}` }),
    }),
    getRegion: builder.query<RegionResponseData, number | string>({
      query: IdOrName => ({ url: `region/${IdOrName}` }),
    }),
    getType: builder.query<TypeResponseData, number | string>({
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
