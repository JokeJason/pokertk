import { pokedexApi } from 'features/Pokedex/pokedexApi';
import { pokedexSlice } from 'features/Pokedex/pokedexSlice';
import { configureStore } from '@reduxjs/toolkit';
import region1 from 'features/Pokedex/__test__/responses/region1.json';
import pokemon1 from 'features/Pokedex/__test__/responses/pokemon1.json';
import { AppStore } from 'app/store';

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

  afterEach(() => {
    store.dispatch(pokedexApi.util.resetApiState());
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
  });
});
