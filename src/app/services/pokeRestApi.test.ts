import { pokedexSlice } from 'features/Pokedex/pokedexSlice';
import { pokeRestApi } from 'app/services/pokeRestApi';
import { filterSlice } from 'features/Filters/filterSlice';
import { getIdFromUrl } from 'app/services/pokeRestApi';

import { configureStore } from '@reduxjs/toolkit';

import { AppStore } from 'app/store';
import {
  EvolutionChainResponseData,
  PokemonResponseData,
  PokemonSpeciesResponseData,
  TypeListResponseData,
} from 'types/api';

let store: AppStore;

describe('pokeRestApi', () => {
  beforeEach(() => {
    store = configureStore({
      reducer: {
        pokedex: pokedexSlice.reducer,
        filter: filterSlice.reducer,
        [pokeRestApi.reducerPath]: pokeRestApi.reducer,
      },
      middleware: getDefaultMiddleware =>
        getDefaultMiddleware().concat(pokeRestApi.middleware),
    });
  });

  describe('JEST test against mock API', () => {
    describe('test getPokemon query', () => {
      test('visit https://pokeapi.co/api/v2/pokemon/85 returns Dodrio', async () => {
        await store.dispatch(pokeRestApi.endpoints.getPokemon.initiate(85));

        const pokemon = pokeRestApi.endpoints.getPokemon.select(85)(
          store.getState(),
        ).data as PokemonResponseData;
        expect(pokemon?.name).toBe('dodrio');
        expect(pokemon?.types).toHaveLength(2);
        expect(pokemon?.types[0].type.name).toBe('normal');
        expect(pokemon?.types[1].type.name).toBe('flying');
        expect(pokemon?.sprites.other.dream_world.front_default).toBe(
          'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/85.svg',
        );
      });
    });

    describe('test getPokemonSpecies query', () => {
      test('visit https://pokeapi.co/api/v2/pokemon-species/6/', async () => {
        await store.dispatch(
          pokeRestApi.endpoints.getPokemonSpecies.initiate(6),
        );

        const pokemonSpecies = pokeRestApi.endpoints.getPokemonSpecies.select(
          6,
        )(store.getState()).data as PokemonSpeciesResponseData;
        expect(pokemonSpecies?.evolution_chain.url).toBe(
          'https://pokeapi.co/api/v2/evolution-chain/2/',
        );
      });
    });

    describe('test getPokemonSpecies query', () => {
      test('visit https://pokeapi.co/api/v2/pokemon-species/6/', async () => {
        await store.dispatch(
          pokeRestApi.endpoints.getPokemonSpeciesFromUrl.initiate(
            'https://pokeapi.co/api/v2/pokemon-species/6/',
          ),
        );

        const pokemonSpecies =
          pokeRestApi.endpoints.getPokemonSpeciesFromUrl.select(
            'https://pokeapi.co/api/v2/pokemon-species/6/',
          )(store.getState()).data as PokemonSpeciesResponseData;
        expect(pokemonSpecies?.evolution_chain.url).toBe(
          'https://pokeapi.co/api/v2/evolution-chain/2/',
        );
      });
    });

    describe('test getTypeList query', () => {
      test('visit https://pokeapi.co/api/v2/type should return correct data in list', async () => {
        await store.dispatch(pokeRestApi.endpoints.getTypeList.initiate());

        const typeListData = pokeRestApi.endpoints.getTypeList.select()(
          store.getState(),
        ).data as TypeListResponseData;
        expect(typeListData?.results).toHaveLength(typeListData.count + 1);
      });
    });

    describe('test getEvolutionChain query', () => {
      test('visit https://pokeapi.co/api/v2/evolution-chain/2/', async () => {
        await store.dispatch(
          pokeRestApi.endpoints.getEvolutionChain.initiate(2),
        );

        const evolutionChainData =
          pokeRestApi.endpoints.getEvolutionChain.select(2)(store.getState())
            .data as EvolutionChainResponseData;
        expect(evolutionChainData?.chain.species.url).toBe(
          'https://pokeapi.co/api/v2/pokemon-species/4/',
        );
        expect(evolutionChainData?.chain.evolves_to[0].species.url).toBe(
          'https://pokeapi.co/api/v2/pokemon-species/5/',
        );
        expect(
          evolutionChainData?.chain.evolves_to[0].evolves_to[0].species.url,
        ).toBe('https://pokeapi.co/api/v2/pokemon-species/6/');
      });
    });

    describe('test getEvolutionChainFromUrl query', () => {
      test('visit https://pokeapi.co/api/v2/evolution-chain/2/', async () => {
        await store.dispatch(
          pokeRestApi.endpoints.getEvolutionChainFromUrl.initiate(
            'https://pokeapi.co/api/v2/evolution-chain/2/',
          ),
        );

        const evolutionChainData =
          pokeRestApi.endpoints.getEvolutionChainFromUrl.select(
            'https://pokeapi.co/api/v2/evolution-chain/2/',
          )(store.getState()).data as EvolutionChainResponseData;
        expect(evolutionChainData?.chain.species.url).toBe(
          'https://pokeapi.co/api/v2/pokemon-species/4/',
        );
        expect(evolutionChainData?.chain.evolves_to[0].species.url).toBe(
          'https://pokeapi.co/api/v2/pokemon-species/5/',
        );
        expect(
          evolutionChainData?.chain.evolves_to[0].evolves_to[0].species.url,
        ).toBe('https://pokeapi.co/api/v2/pokemon-species/6/');
      });
    });
  });

  describe('test helper functions', () => {
    test('getIdFromUrl works correctly for PokemonSpecies', () => {
      const url = 'https://pokeapi.co/api/v2/pokemon-species/6/';
      const id = getIdFromUrl(url);
      expect(id).toBe(6);
    });

    test('getIdFromUrl works correctly for evolution-chain', () => {
      const url = 'https://pokeapi.co/api/v2/evolution-chain/2/';
      const id = getIdFromUrl(url);
      expect(id).toBe(2);
    });
  });
});
