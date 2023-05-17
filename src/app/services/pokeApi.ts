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
  EvolutionChain,
} from 'types/api';
import { InfoDialogComponentProps } from 'components/InfoDialogComponent';
import { EvolutionSpeciesProps } from 'components/EvolutionSpecies';

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

export const getIdFromUrl = (url: string) => {
  const urlParts = url.split('/');
  return parseInt(urlParts[urlParts.length - 2]);
};

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

export const convertEvolutionChainResponseDataToEvolutionSpeciesProps = (
  evo: EvolutionChainResponseData,
): EvolutionSpeciesProps[] => {
  const result: EvolutionSpeciesProps[] = [];
  // const addEvolutionSpeciesProps = (evo: EvolutionChain, level: number) => {
  //   result.push({
  //     name: evo.species.name,
  //   });
  //   evo.evolves_to.forEach(evo => {
  //     addEvolutionSpeciesProps(evo, level + 1);
  //   });
  // };
  //
  // addEvolutionSpeciesProps(evo.chain, 0);
  return result;
};

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
    getPokemon: builder.query<PokemonResponseData, number>({
      query: Id => ({ url: `pokemon/${Id}` }),
    }),
    getPokemonSpecies: builder.query<PokemonSpeciesResponseData, number>({
      query: Id => ({ url: `pokemon-species/${Id}` }),
    }),
    getEvolutionChain: builder.query<EvolutionChainResponseData, number>({
      query: Id => ({ url: `evolution-chain/${Id}` }),
    }),
    getPokemonInfo: builder.query<string, number>({
      async queryFn(pokemonId, queryApi) {
        const pokemon: PokemonResponseData = await queryApi
          .dispatch(pokeApi.endpoints.getPokemon.initiate(pokemonId))
          .unwrap();

        const pokemonSpecies: PokemonSpeciesResponseData = await queryApi
          .dispatch(
            pokeApi.endpoints.getPokemonSpecies.initiate(
              getIdFromUrl(pokemon.species.url),
            ),
          )
          .unwrap();

        const evolutionChain: EvolutionChainResponseData = await queryApi
          .dispatch(
            pokeApi.endpoints.getEvolutionChain.initiate(
              getIdFromUrl(pokemonSpecies.evolution_chain.url),
            ),
          )
          .unwrap();

        return { data: 'test' };
      },
    }),
  }),
});

export const {
  useGetTypeListQuery,
  useGetPokemonQuery,
  useGetPokemonSpeciesQuery,
  useGetEvolutionChainQuery,
} = pokeApi;
