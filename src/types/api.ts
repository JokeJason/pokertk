// API Base types
export interface nameUrlPair {
  name: string;
  url: string;
}

export interface ListResponse {
  count: number;
  results: nameUrlPair[];
}

// Filter API
export type RegionListResponseData = ListResponse;
export type TypeListResponseData = ListResponse;

// InfoDialog API
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
  sprites: {
    back_default: string;
    front_default: string;
    other: {
      dream_world: {
        front_default: string;
      };
      'official-artwork': {
        front_default: string;
      };
    };
  };
}

export type PokemonSpeciesResponseData = {
  // many fields are ignored
  evolution_chain: {
    url: string;
  };
};

type EvolutionChain = {
  evolves_to: EvolutionChain[];
  species: {
    name: string;
    url: string;
  };
};

export type EvolutionChainResponseData = {
  // many fields are ignored
  chain: EvolutionChain;
};
