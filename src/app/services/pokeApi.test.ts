import { pokedexSlice } from 'features/Pokedex/pokedexSlice';
import { pokeApi } from 'app/services/pokeApi';
import { filterSlice } from 'features/Filters/filterSlice';
import { configureStore } from '@reduxjs/toolkit';

import { AppStore } from 'app/store';
import {
  EvolutionChainResponseData,
  PokemonResponseData,
  PokemonSpeciesResponseData,
  TypeListResponseData,
} from 'types/api';

let store: AppStore;

describe('pokeApi', () => {
  beforeEach(() => {
    store = configureStore({
      reducer: {
        pokedex: pokedexSlice.reducer,
        filter: filterSlice.reducer,
        [pokeApi.reducerPath]: pokeApi.reducer,
      },
      middleware: getDefaultMiddleware =>
        getDefaultMiddleware().concat(pokeApi.middleware),
    });
  });

  describe('JEST test against mock API', () => {
    describe('test getPokemon query', () => {
      test('visit https://pokeapi.co/api/v2/pokemon/85 returns Dodrio', async () => {
        await store.dispatch(pokeApi.endpoints.getPokemon.initiate(85));

        const pokemon = pokeApi.endpoints.getPokemon.select(85)(
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
        await store.dispatch(pokeApi.endpoints.getPokemonSpecies.initiate(6));

        const pokemonSpecies = pokeApi.endpoints.getPokemonSpecies.select(6)(
          store.getState(),
        ).data as PokemonSpeciesResponseData;
        expect(pokemonSpecies?.evolution_chain.url).toBe(
          'https://pokeapi.co/api/v2/evolution-chain/2/',
        );
      });
    });

    describe('test getTypeList query', () => {
      test('visit https://pokeapi.co/api/v2/type should return correct data in list', async () => {
        await store.dispatch(pokeApi.endpoints.getTypeList.initiate());

        const typeListData = pokeApi.endpoints.getTypeList.select()(
          store.getState(),
        ).data as TypeListResponseData;
        expect(typeListData?.results).toHaveLength(typeListData.count + 1);
      });
    });

    describe('test getEvolutionChain query', () => {
      test('visit https://pokeapi.co/api/v2/evolution-chain/2/', async () => {
        await store.dispatch(pokeApi.endpoints.getEvolutionChain.initiate(2));

        const evolutionChainData = pokeApi.endpoints.getEvolutionChain.select(
          2,
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
});
