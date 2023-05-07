import { createApi } from '@reduxjs/toolkit/query/react';
import { pokeApiBaseQuery } from '../../services/pokeapi/paginationBaseQuery';
import {
  RegionListResponseData,
  TypeListResponseData,
} from '../Pokedex/types/api';

export const filterApi = createApi({
  reducerPath: 'filterApi',
  baseQuery: pokeApiBaseQuery,
  endpoints: builder => ({
    getTypeList: builder.query<TypeListResponseData, void>({
      query: () => ({ url: 'type', fetchAllPages: true }),
      transformResponse: (response: RegionListResponseData) => {
        return {
          ...response,
          results: [{ name: 'All Types', url: '' }, ...response.results],
        };
      },
    }),
  }),
});

export const { useGetTypeListQuery } = filterApi;
