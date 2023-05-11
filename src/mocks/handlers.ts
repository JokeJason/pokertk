import { rest } from 'msw';

import region1 from 'features/Pokedex/__test__/responses/region1.json';
import regionList from 'features/Pokedex/__test__/responses/regionList.json';
import typeList from 'features/Filters/__test__/responses/typeList.json';
import pokemonListPg1 from 'features/Pokedex/__test__/responses/pokemonListPage1.json';
import pokemonListPg2 from 'features/Pokedex/__test__/responses/pokemonListPage2.json';

import dodrio from 'app/services/__test__/responses/pokemon_85.json';
import pokemonSpecies6 from 'app/services/__test__/responses/pokemon-species_6.json';
import evolutionChain2 from 'app/services/__test__/responses/evolution-chain_2.json';

export const handlers = [
  // mock https://pokeapi.co/api/v2/region/1
  rest.get('https://pokeapi.co/api/v2/region/999999', (req, res, ctx) => {
    return res(ctx.json(region1));
  }),

  // mock https://pokeapi.co/api/v2/region/kanto
  rest.get('https://pokeapi.co/api/v2/region/testregion', (req, res, ctx) => {
    return res(ctx.json(region1));
  }),

  rest.get('https://pokeapi.co/api/v2/region', (req, res, ctx) => {
    return res(ctx.json(regionList));
  }),

  rest.get('https://pokeapi.co/api/v2/type', (req, res, ctx) => {
    return res(ctx.json(typeList));
  }),

  rest.get('https://pokeapi.co/api/v2/pokemon', (req, res, ctx) => {
    const offset = req.url.searchParams.get('offset');
    const limit = req.url.searchParams.get('limit');
    if (offset === null && limit === null) {
      return res(ctx.json(pokemonListPg1));
    } else {
      return res(ctx.json(pokemonListPg2));
    }
  }),

  // mock https://pokeapi.co/api/v2/pokemon/85
  rest.get('https://pokeapi.co/api/v2/pokemon/85', (req, res, ctx) => {
    return res(ctx.json(dodrio));
  }),

  // mock https://pokeapi.co/api/v2/pokemon-species/6
  rest.get('https://pokeapi.co/api/v2/pokemon-species/6', (req, res, ctx) => {
    return res(ctx.json(pokemonSpecies6));
  }),

  // mock https://pokeapi.co/api/v2/evolution-chain/2
  rest.get('https://pokeapi.co/api/v2/evolution-chain/2', (req, res, ctx) => {
    return res(ctx.json(evolutionChain2));
  }),
];
