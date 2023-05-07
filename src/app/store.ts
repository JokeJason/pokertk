import { configureStore } from '@reduxjs/toolkit';
import { listenerMiddleware } from './listenerMiddleware';
import { pokedexSlice } from 'features/Pokedex/pokedexSlice';
import { filterSlice } from 'features/Filters/filterSlice';
import { filterApi } from 'features/Filters/filterApi';

export const store = configureStore({
  reducer: {
    // component slices
    pokedex: pokedexSlice.reducer,
    filter: filterSlice.reducer,

    // api slices
    [filterApi.reducerPath]: filterApi.reducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware().concat(
      filterApi.middleware,
      listenerMiddleware.middleware,
    ),
  devTools: true,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppStore = typeof store;
