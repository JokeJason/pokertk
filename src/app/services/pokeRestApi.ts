import { fetchBaseQuery, createApi } from '@reduxjs/toolkit/query/react';
import {
  RegionListResponseData,
  TypeListResponseData,
  PokemonResponseData,
  EvolutionChainResponseData,
  PokemonSpeciesResponseData,
} from 'types/api';

export const getIdFromUrl = (url: string) => {
  const urlParts = url.split('/');
  return parseInt(urlParts[urlParts.length - 2]);
};

export const pokeRestApi = createApi({
  reducerPath: 'pokeRestApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://pokeapi.co/api/v2/' }),
  endpoints: builder => ({
    getTypeList: builder.query<TypeListResponseData, void>({
      query: () => ({ url: 'type' }),
      transformResponse: (response: RegionListResponseData) => {
        return {
          ...response,
          results: [{ name: 'All Types', url: '' }, ...response.results],
        };
      },
    }),
    getPokemon: builder.query<PokemonResponseData, string | number>({
      query: IdOrName => ({ url: `pokemon/${IdOrName}` }),
    }),
    getPokemonSpecies: builder.query<PokemonSpeciesResponseData, number>({
      query: Id => ({ url: `pokemon-species/${Id}` }),
    }),
    getPokemonSpeciesFromUrl: builder.query<PokemonSpeciesResponseData, string>(
      {
        query: url => ({ url: `pokemon-species/${getIdFromUrl(url)}` }),
      },
    ),
    getEvolutionChain: builder.query<EvolutionChainResponseData, number>({
      query: Id => ({ url: `evolution-chain/${Id}` }),
    }),
    getEvolutionChainFromUrl: builder.query<EvolutionChainResponseData, string>(
      {
        query: url => ({ url: `evolution-chain/${getIdFromUrl(url)}` }),
      },
    ),
  }),
});

export const {
  useGetTypeListQuery,
  useGetPokemonQuery,
  useGetPokemonSpeciesQuery,
  useGetPokemonSpeciesFromUrlQuery,
  useGetEvolutionChainQuery,
  useGetEvolutionChainFromUrlQuery,
} = pokeRestApi;
