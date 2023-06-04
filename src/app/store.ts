import { configureStore } from '@reduxjs/toolkit';
import { pokedexSlice } from 'features/Pokedex/pokedexSlice';
import { filterSlice } from 'features/Filters/filterSlice';
import { infoDialogSlice } from 'features/InfoDialog/infoDialogSlice';
import { pokeRestApi } from './services/pokeRestApi';

export const store = configureStore({
  reducer: {
    // component slices
    pokedex: pokedexSlice.reducer,
    filter: filterSlice.reducer,
    infoDialog: infoDialogSlice.reducer,

    // api slices
    [pokeRestApi.reducerPath]: pokeRestApi.reducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware().concat(pokeRestApi.middleware),
  devTools: true,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppStore = typeof store;
