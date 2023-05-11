import { pokedexSlice } from 'features/Pokedex/pokedexSlice';
import { pokeApi } from 'app/services/pokeApi';
import { filterSlice } from '../../features/Filters/filterSlice';
import { configureStore } from '@reduxjs/toolkit';

import { AppStore } from 'app/store';
import { TypeListResponseData } from 'types/api';

let store: AppStore;

describe('filterApi', () => {
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
    test('visit https://pokeapi.co/api/v2/type should return correct data in list', async () => {
      await store.dispatch(pokeApi.endpoints.getTypeList.initiate());

      const typeListData = pokeApi.endpoints.getTypeList.select()(
        store.getState(),
      ).data as TypeListResponseData;
      expect(typeListData?.results).toHaveLength(typeListData.count + 1);
    });
  });
});
