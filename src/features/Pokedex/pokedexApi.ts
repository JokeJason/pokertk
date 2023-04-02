import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import {
  pokeApiAllPagesCustomBaseQuery,
  pokeApiFullListFetchArgs,
} from './paginationBaseQuery';
import { setFetchingRegionPokemonList } from './pokedexSlice';
import {
  AreaResponseData,
  LocationResponseData,
  PokemonListResponseData,
  PokemonResponseData,
  RegionListResponseData,
  RegionResponseData,
  TypeListResponseData,
  TypeResponseData,
  PokemonListItem,
  nameUrlPair,
  PokemonList,
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
    getLocation: builder.query<LocationResponseData, number | string>({
      query: IdOrName => ({ url: `location/${IdOrName}` }),
    }),
    getArea: builder.query<AreaResponseData, number | string>({
      query: IdOrName => ({ url: `location-area/${IdOrName}` }),
    }),
    // TODO: decide whether remove this endpoint, as logic of getting PokemonList for a region is no longer correct
    getRegionPokemonList: builder.query<PokemonListItem[], number | string>({
      async queryFn(regionIdOrName, api) {
        api.dispatch(setFetchingRegionPokemonList(true));

        // Get region data
        const regionData: RegionResponseData = await api
          .dispatch(pokedexApi.endpoints.getRegion.initiate(regionIdOrName))
          .unwrap();

        // Get location data
        const locationDataList: LocationResponseData[] = await Promise.all(
          regionData.locations.map(location =>
            api
              .dispatch(
                pokedexApi.endpoints.getLocation.initiate(location.name),
              )
              .unwrap(),
          ),
        );

        // Get area datas
        const areaDataList: AreaResponseData[] = await Promise.all(
          locationDataList
            .flatMap(locationData => locationData.areas)
            .map(area =>
              api
                .dispatch(pokedexApi.endpoints.getArea.initiate(area.name))
                .unwrap(),
            ),
        );

        // Collect unique Pokemon
        const uniquePokemonList = new Set<nameUrlPair>();
        areaDataList.forEach(areaData => {
          areaData.pokemon_encounters.forEach(pokemon => {
            uniquePokemonList.add(pokemon.pokemon);
          });
        });

        // Get Pokemon data
        const pokemonDataList: PokemonListItem[] = await Promise.all(
          Array.from(uniquePokemonList).map(pokemon =>
            api
              .dispatch(pokedexApi.endpoints.getPokemon.initiate(pokemon.name))
              .unwrap()
              .then(pokemonData => {
                return {
                  name: pokemonData.name,
                  id: pokemonData.id,
                  type: pokemonData.types.map(type => type.type.name),
                  image: pokemonData.sprites.other.dream_world.front_default,
                };
              }),
          ),
        );

        api.dispatch(setFetchingRegionPokemonList(false));

        return { data: Array.from(pokemonDataList) };
      },
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
  useGetAreaQuery,
  useGetLocationQuery,
  useGetRegionPokemonListQuery,
} = pokedexApi;
