import {
  fetchBaseQuery,
  FetchArgs,
  createApi,
} from '@reduxjs/toolkit/query/react';
import {
  RegionListResponseData,
  TypeListResponseData,
  PokemonResponseData,
  EvolutionChainResponseData,
  PokemonSpeciesResponseData,
} from 'types/api';

export interface pokeApiFullListFetchArgs extends FetchArgs {
  fetchAllPages?: boolean;
}

interface PokeAPIPaginatedResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: any[];
}

interface PokeAPIFullListResponse {
  count: number;
  results: any[];
}

async function fetchAllPages(url: string | null) {
  const allResults: any[] = [];

  while (url) {
    const response = await fetch(url);
    const data = (await response.json()) as PokeAPIPaginatedResponse;
    allResults.push(...data.results);
    url = data.next;
  }

  return allResults;
}

export const paginationBaseQuery = (baseUrl: string) =>
  fetchBaseQuery({ baseUrl });

export const pokeApiAllPagesCustomBaseQuery = async (
  args: pokeApiFullListFetchArgs,
  api: any,
  extra: any,
  baseUrl: string,
) => {
  const result = await paginationBaseQuery(baseUrl)(args, api, extra);
  if (result.data && args.fetchAllPages) {
    const data = result.data as PokeAPIPaginatedResponse;
    if (data.next) {
      const allResults = await fetchAllPages(data.next);
      data.results = data.results.concat(allResults);
    }

    const fullListReponse: PokeAPIFullListResponse = {
      count: data.count,
      results: data.results,
    };

    result.data = fullListReponse;
  }
  return result;
};

export const pokeApiBaseQuery = async (
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

export const pokeApi = createApi({
  reducerPath: 'pokeApi',
  baseQuery: pokeApiBaseQuery,
  endpoints: builder => ({
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
    getPokemonSpecies: builder.query<
      PokemonSpeciesResponseData,
      number | string
    >({
      query: IdOrName => ({ url: `pokemon-species/${IdOrName}` }),
    }),
    getEvolutionChain: builder.query<EvolutionChainResponseData, number>({
      query: Id => ({ url: `evolution-chain/${Id}` }),
    }),
  }),
});

export const {
  useGetTypeListQuery,
  useGetPokemonQuery,
  useGetPokemonSpeciesQuery,
  useGetEvolutionChainQuery,
} = pokeApi;
