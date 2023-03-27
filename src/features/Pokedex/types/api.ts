export interface nameUrlPair {
  name: string;
  url: string;
}

export interface ListResponse {
  count: number;
  results: nameUrlPair[];
}

export type PokemonListResponseData = ListResponse;
export type RegionListResponseData = ListResponse;
export type TypeListResponseData = ListResponse;

export interface RegionResponseData {
  // many fields are ignored
  id: number;
  locations: nameUrlPair[];
  name: string;
}

export interface TypeResponseData {
  // many fields are ignored
  id: number;
  name: string;
}

export interface AbilityItem {
  ability: nameUrlPair;
  is_hidden: boolean;
  slot: number;
}

export interface StatItem {
  base_stat: number;
  effort: number;
  stat: nameUrlPair;
}

export interface typeItem {
  slot: number;
  type: nameUrlPair;
}

export interface PokemonResponseData {
  // many fields are ignored
  abilities: AbilityItem[];
  base_experience: number;
  forms: nameUrlPair[];
  height: number;
  held_items: any[];
  id: number;
  is_default: boolean;
  location_area_encounters: string;
  name: string;
  order: number;
  species: nameUrlPair;
  stats: StatItem[];
  types: typeItem[];
  weight: number;
}
