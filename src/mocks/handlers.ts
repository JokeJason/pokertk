import { rest } from 'msw';

import region1 from 'features/Pokedex/__test__/responses/region1.json';
import regionList from 'features/Pokedex/__test__/responses/regionList.json';
import typeList from 'features/Pokedex/__test__/responses/typeList.json';
import pokemonListPg1 from 'features/Pokedex/__test__/responses/pokemonListPage1.json';
import pokemonListPg2 from 'features/Pokedex/__test__/responses/pokemonListPage2.json';
import region_johto from 'features/Pokedex/__test__/responses/region_johto.json';
import location_blackthorn_city from 'features/Pokedex/__test__/responses/location_blackthorn-city.json';
import location_burned_tower from 'features/Pokedex/__test__/responses/location_burned-tower.json';
import area_blackthorn_city_area from 'features/Pokedex/__test__/responses/area_blackthorn-city-area.json';
import area_burned_tower_1f from 'features/Pokedex/__test__/responses/area_burned-tower-1f.json';
import area_burned_tower_b1f from 'features/Pokedex/__test__/responses/area_burned-tower-b1f.json';

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

  // getRegionPokemonList
  // TODO: decide whether remove these test handlers, as logic of getting Pokemon List for a Region is no longer correct
  rest.get('https://pokeapi.co/api/v2/region/johto', (req, res, ctx) => {
    return res(ctx.json(region_johto));
  }),
  rest.get('https://pokeapi.co/api/v2/location/65', (req, res, ctx) => {
    return res(ctx.json(location_blackthorn_city));
  }),
  rest.get('https://pokeapi.co/api/v2/location/66', (req, res, ctx) => {
    return res(ctx.json(location_burned_tower));
  }),
  rest.get('https://pokeapi.co/api/v2/location-area/249', (req, res, ctx) => {
    return res(ctx.json(area_blackthorn_city_area));
  }),
  rest.get('https://pokeapi.co/api/v2/location-area/212', (req, res, ctx) => {
    return res(ctx.json(area_burned_tower_1f));
  }),
  rest.get('https://pokeapi.co/api/v2/location-area/213', (req, res, ctx) => {
    return res(ctx.json(area_burned_tower_b1f));
  }),
];
