import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import type { Slice, PayloadAction } from '@reduxjs/toolkit';

import { pokeApi } from 'app/services/pokeApi';
import { EvolutionSpeciesProps } from 'components/EvolutionSpecies';
import { Stat } from 'components/InfoDialogComponent';
import {
  EvolutionChain,
  EvolutionChainResponseData,
  FlavorTextEntry,
  generaItem,
  PokemonResponseData,
  PokemonSpeciesResponseData,
} from 'types/api';

type InfoDiaglogDetails = {
  id: number;
  name: string;
  genera: string;
  image: string;
  types: string[];
  height: number;
  weight: number;
  genderRatio: number;
  description: string;
  abilities: string[];
  stats: Stat[];
  evolutionChain: EvolutionSpeciesProps[];
};

const initialInfoDialogDetails: InfoDiaglogDetails = {
  id: 0,
  name: '',
  genera: '',
  image: '',
  types: [],
  height: 0,
  weight: 0,
  genderRatio: 0,
  description: '',
  abilities: [],
  stats: [],
  evolutionChain: [],
};

export type InfoDialogStateProps = {
  isOpen: boolean;
  InfoDialogDetails: InfoDiaglogDetails;
};

export const initialState: InfoDialogStateProps = {
  isOpen: false,
  InfoDialogDetails: initialInfoDialogDetails,
};

// create a function named constructNameOfEvolutionChainFromResponse to
// iterate though EvolutionChainResponseData recursively and add name to result
export const constructEvolutionChainFromResponse = (
  response: EvolutionChainResponseData,
) => {
  const result: string[] = [];
  const addEvolutionSpeciesProps = (evo: EvolutionChain) => {
    result.push(evo.species.name);
    evo.evolves_to.forEach(evo => {
      addEvolutionSpeciesProps(evo);
    });
  };

  addEvolutionSpeciesProps(response.chain);
  return result;
};

export const findEnglishGenera = (generaItem: generaItem[]) =>
  generaItem.find(genera => genera.language.name === 'en');

export const findFirstEnglishFlavorText = (
  flavorTextEntries: FlavorTextEntry[],
): string => {
  const englishFlavorTextItems = flavorTextEntries.filter(
    flavorText => flavorText.language.name === 'en',
  );
  if (englishFlavorTextItems) {
    return englishFlavorTextItems[0].flavor_text;
  } else {
    return 'Error';
  }
};

export const constructPokemonInfoFromResponses = (
  fetchedPokemon: PokemonResponseData,
  fetchedPokemonSpecies: PokemonSpeciesResponseData,
  evolutionChain: EvolutionSpeciesProps[],
): InfoDiaglogDetails => {
  return {
    id: fetchedPokemon.id,
    name: fetchedPokemon.name,
    genera: findEnglishGenera(fetchedPokemonSpecies.genera)?.genus || '',
    image: fetchedPokemon.sprites.other.dream_world.front_default,
    types: fetchedPokemon.types.map(type => type.type.name),
    height: fetchedPokemon.height,
    weight: fetchedPokemon.weight,
    genderRatio: fetchedPokemonSpecies.gender_rate - 1,
    description: findFirstEnglishFlavorText(
      fetchedPokemonSpecies.flavor_text_entries,
    ),
    abilities: fetchedPokemon.abilities.map(ability => ability.ability.name),
    stats: fetchedPokemon.stats.map(stat => ({
      stat__name: stat.stat.name,
      stat__value: stat.base_stat,
    })),
    evolutionChain: evolutionChain,
  };
};

export const fetchSelectedPokemonInfo = createAsyncThunk(
  'infoDialog/fetchSelectedPokemonInfo',
  async (pokemonId: number, thunkAPI) => {
    const { data: selectedPokemon } = await pokeApi.useGetPokemonQuery(
      pokemonId,
    );
    if (selectedPokemon && selectedPokemon.species) {
      const { data: selectedPokemonSpecies } =
        await pokeApi.useGetPokemonSpeciesFromUrlQuery(
          selectedPokemon.species.url,
        );
      if (selectedPokemonSpecies && selectedPokemonSpecies.evolution_chain) {
        const { data: selectedPokemonEvolutionChain } =
          await pokeApi.useGetEvolutionChainFromUrlQuery(
            selectedPokemonSpecies.evolution_chain.url,
          );
        if (selectedPokemonEvolutionChain) {
          const evolutionChainNames = constructEvolutionChainFromResponse(
            selectedPokemonEvolutionChain,
          );
          // for each name in evolutionChain, fetch the pokemon
          const evolutionChain: EvolutionSpeciesProps[] = [];
          evolutionChainNames.map(async name => {
            const { data: evolutionChainPokemon } =
              await pokeApi.useGetPokemonQuery(name);
            if (evolutionChainPokemon) {
              evolutionChain.push({
                types: evolutionChainPokemon.types.map(type => type.type.name),
                name: evolutionChainPokemon.name,
                image_url:
                  evolutionChainPokemon.sprites.other.dream_world.front_default,
              });
            }
          });

          const selectedPokemonInfo = constructPokemonInfoFromResponses(
            selectedPokemon,
            selectedPokemonSpecies,
            evolutionChain,
          );

          return selectedPokemonInfo;
        }
      }
    }

    return null;
  },
);

export const infoDialogSlice: Slice<InfoDialogStateProps> = createSlice({
  name: 'infoDialog',
  initialState,
  reducers: {
    setIsOpen: (state, action: PayloadAction<boolean>) => {
      state.isOpen = action.payload;
    },
  },
  extraReducers: builder => {
    builder.addCase(fetchSelectedPokemonInfo.fulfilled, (state, action) => {
      if (action.payload) {
        state.InfoDialogDetails = action.payload;
        state.isOpen = true;
      }
    });
  },
});

export const { setIsOpen } = infoDialogSlice.actions;

export default infoDialogSlice.reducer;
