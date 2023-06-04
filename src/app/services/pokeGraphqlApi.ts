import { createApi } from '@reduxjs/toolkit/query';
import { request, gql, ClientError } from 'graphql-request';

const graphqlBaseQuery =
  ({ baseUrl }: { baseUrl: string }) =>
  async ({ body }: { body: string }) => {
    try {
      const result = await request(baseUrl, body);
      return { data: result };
    } catch (error) {
      if (error instanceof ClientError) {
        return { error: { status: error.response.status, data: error } };
      }
      return { error: { status: 500, data: error } };
    }
  };

export const pokeGraphqlApi = createApi({
  baseQuery: graphqlBaseQuery({
    baseUrl: 'https://beta.pokeapi.co/graphql/v1beta',
  }),
  endpoints: builder => ({
    getRegionList: builder.query({
      query: () => ({
        body: gql`
          query {
            pokemon_v2_region {
              id
              name
            }
          }
        `,
      }),
      transformResponse: response => response.pokemon_v2_region.data,
    }),
  }),
});
