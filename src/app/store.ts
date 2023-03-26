import { configureStore } from '@reduxjs/toolkit';
import { pokedexApi } from 'features/Pokedex/pokedexApi';
import { pokedexSlice } from 'features/Pokedex/pokedexSlice';

export const store = configureStore({
  reducer: {
    // component slices
    pokedex: pokedexSlice.reducer,

    // api
    [pokedexApi.reducerPath]: pokedexApi.reducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware().concat(pokedexApi.middleware),
  devTools: true,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppStore = typeof store;
