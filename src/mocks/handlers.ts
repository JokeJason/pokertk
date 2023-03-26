import { rest } from 'msw';

import region1 from 'features/Pokedex/__test__/responses/region1.json';
import regionList from 'features/Pokedex/__test__/responses/regionList.json';
import typeList from 'features/Pokedex/__test__/responses/typeList.json';

export const handlers = [
  // mock https://pokeapi.co/api/v2/region/1
  rest.get('https://pokeapi.co/api/v2/region/999999', (req, res, ctx) => {
    return res(ctx.json(region1));
  }),

  // mock https://pokeapi.co/api/v2/region/kanto
  rest.get('https://pokeapi.co/api/v2/region/testregion', (req, res, ctx) => {
    return res(ctx.json(region1));
  }),

  rest.get('https//pokeapi.co/api/v2/region', (req, res, ctx) => {
    return res(ctx.json(regionList));
  }),

  rest.get('https//pokeapi.co/api/v2/type', (req, res, ctx) => {
    return res(ctx.json(typeList));
  }),
];
