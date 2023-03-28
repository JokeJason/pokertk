import { pokedexApi } from 'features/Pokedex/pokedexApi';
import { pokedexSlice } from 'features/Pokedex/pokedexSlice';
import { configureStore } from '@reduxjs/toolkit';
import region1 from 'features/Pokedex/__test__/responses/region1.json';
import pokemon1 from 'features/Pokedex/__test__/responses/pokemon1.json';
import { AppStore } from 'app/store';
import { RegionListResponseData, TypeListResponseData } from '../types/api';

let store: AppStore;
describe('pokedexApi', () => {
  beforeEach(() => {
    store = configureStore({
      reducer: {
        pokedex: pokedexSlice.reducer,
        [pokedexApi.reducerPath]: pokedexApi.reducer,
      },
      middleware: getDefaultMiddleware =>
        getDefaultMiddleware().concat(pokedexApi.middleware),
    });
  });

  describe('JEST test against real API', () => {
    test('visit https://pokeapi.co/api/v2/region/1 should return correct data', async () => {
      await store.dispatch(pokedexApi.endpoints.getRegion.initiate(1));

      const region1Data = pokedexApi.endpoints.getRegion.select(1)(
        store.getState(),
      ).data;
      expect(region1Data).toEqual(region1);
    });

    test('visit https://pokeapi.co/api/v2/region/kanto should return correct data', async () => {
      await store.dispatch(pokedexApi.endpoints.getRegion.initiate('kanto'));

      const region1Data = pokedexApi.endpoints.getRegion.select('kanto')(
        store.getState(),
      ).data;
      expect(region1Data).toEqual(region1);
    });

    test('visit https://pokeapi.co/api/v2/pokemon/1 should return correct data', async () => {
      await store.dispatch(pokedexApi.endpoints.getPokemon.initiate(1));

      const region1Data = pokedexApi.endpoints.getPokemon.select(1)(
        store.getState(),
      ).data;
      expect(region1Data).toEqual(pokemon1);
    });

    test('visit https://pokeapi.co/api/v2/pokemon/bulbasaur should return correct data', async () => {
      await store.dispatch(
        pokedexApi.endpoints.getPokemon.initiate('bulbasaur'),
      );

      const region1Data = pokedexApi.endpoints.getPokemon.select('bulbasaur')(
        store.getState(),
      ).data;
      expect(region1Data).toEqual(pokemon1);
    });
  });

  describe('JEST test against mock API', () => {
    test('visit https://pokeapi.co/api/v2/region/999999 should return correct data', async () => {
      await store.dispatch(pokedexApi.endpoints.getRegion.initiate(999999));

      const region1Data = pokedexApi.endpoints.getRegion.select(999999)(
        store.getState(),
      ).data;
      expect(region1Data).toEqual(region1);
    });

    test('visit https://pokeapi.co/api/v2/region/testregion should return correct data', async () => {
      await store.dispatch(
        pokedexApi.endpoints.getRegion.initiate('testregion'),
      );

      const region1Data = pokedexApi.endpoints.getRegion.select('testregion')(
        store.getState(),
      ).data;
      expect(region1Data).toEqual(region1);
    });

    test('visit https://pokeapi.co/api/v2/region should return correct data in list', async () => {
      await store.dispatch(pokedexApi.endpoints.getRegionList.initiate());

      const regionListData = pokedexApi.endpoints.getRegionList.select()(
        store.getState(),
      ).data as RegionListResponseData;
      expect(regionListData?.results).toHaveLength(regionListData.count);
    });

    test('visit https://pokeapi.co/api/v2/type should return correct data in list', async () => {
      await store.dispatch(pokedexApi.endpoints.getTypeList.initiate());

      const typeListData = pokedexApi.endpoints.getTypeList.select()(
        store.getState(),
      ).data as TypeListResponseData;
      expect(typeListData?.results).toHaveLength(typeListData.count + 1);
    });

    test('visit https://pokeapi.co/api/v2/pokemon should return correct data in list', async () => {
      await store.dispatch(pokedexApi.endpoints.getPokemonList.initiate());

      const pokemonListData = pokedexApi.endpoints.getPokemonList.select()(
        store.getState(),
      ).data;
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      expect(pokemonListData?.results).toHaveLength(pokemonListData.count);
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      expect(pokemonListData?.next).toBeUndefined();
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      expect(pokemonListData?.previous).toBeUndefined();
    });

    test('query getRegionPokemonList for kanto should return correct data in list', async () => {
      await store.dispatch(
        pokedexApi.endpoints.getRegionPokemonList.initiate('johto'),
      );

      const pokemonListData = pokedexApi.endpoints.getRegionPokemonList.select(
        'johto',
      )(store.getState()).data;
      expect(pokemonListData).toHaveLength(19);
    }, 100000000000);
  });
});
