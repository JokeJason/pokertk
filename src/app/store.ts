import { configureStore } from '@reduxjs/toolkit';
import { pokedexSlice } from 'features/Pokedex/pokedexSlice';
import { filterSlice } from 'features/Filters/filterSlice';
import { pokeApi } from './services/pokeApi';

export const store = configureStore({
  reducer: {
    // component slices
    pokedex: pokedexSlice.reducer,
    filter: filterSlice.reducer,

    // api slices
    [pokeApi.reducerPath]: pokeApi.reducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware().concat(pokeApi.middleware),
  devTools: true,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppStore = typeof store;
