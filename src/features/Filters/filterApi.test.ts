import { pokedexSlice } from 'features/Pokedex/pokedexSlice';
import { filterApi } from './filterApi';
import { filterSlice } from './filterSlice';
import { configureStore } from '@reduxjs/toolkit';

import { AppStore } from 'app/store';
import { TypeListResponseData } from 'features/Pokedex/types/api';

let store: AppStore;

describe('filterApi', () => {
  beforeEach(() => {
    store = configureStore({
      reducer: {
        pokedex: pokedexSlice.reducer,
        filter: filterSlice.reducer,
        [filterApi.reducerPath]: filterApi.reducer,
      },
      middleware: getDefaultMiddleware =>
        getDefaultMiddleware().concat(filterApi.middleware),
    });
  });

  describe('JEST test against mock API', () => {
    test('visit https://pokeapi.co/api/v2/type should return correct data in list', async () => {
      await store.dispatch(filterApi.endpoints.getTypeList.initiate());

      const typeListData = filterApi.endpoints.getTypeList.select()(
        store.getState(),
      ).data as TypeListResponseData;
      expect(typeListData?.results).toHaveLength(typeListData.count + 1);
    });
  });
});
