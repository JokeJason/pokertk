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

export type InfoDialogDetails = {
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

const initialInfoDialogDetails: InfoDialogDetails = {
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
  InfoDialogDetails: InfoDialogDetails;
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
): InfoDialogDetails => {
  return {
    id: fetchedPokemon.id,
    name: fetchedPokemon.name,
    genera: findEnglishGenera(fetchedPokemonSpecies.genera)?.genus || '',
    image: fetchedPokemon.sprites.other.dream_world.front_default,
    types: fetchedPokemon.types.map(type => type.type.name),
    height: fetchedPokemon.height,
    weight: fetchedPokemon.weight,
    genderRatio: fetchedPokemonSpecies.gender_rate,
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
    const dispatch = thunkAPI.dispatch;

    try {
      const selectedPokemon = await dispatch(
        pokeApi.endpoints.getPokemon.initiate(pokemonId),
      );

      if (selectedPokemon.data) {
        const selectedPokemonSpecies = await dispatch(
          pokeApi.endpoints.getPokemonSpeciesFromUrl.initiate(
            selectedPokemon.data.species.url,
          ),
        );

        if (selectedPokemonSpecies.data) {
          const selectedPokemonEvolutionChain = await dispatch(
            pokeApi.endpoints.getEvolutionChainFromUrl.initiate(
              selectedPokemonSpecies.data.evolution_chain.url,
            ),
          );

          if (selectedPokemonEvolutionChain.data) {
            const evolutionChainName = constructEvolutionChainFromResponse(
              selectedPokemonEvolutionChain.data,
            );

            // for each name in evolutionChain, fetch the pokemon
            const evolutionChain: EvolutionSpeciesProps[] = [];
            await Promise.all(
              evolutionChainName.map(async name => {
                const evolutionChainPokemon = await dispatch(
                  pokeApi.endpoints.getPokemon.initiate(name),
                );
                if (evolutionChainPokemon.data) {
                  evolutionChain.push({
                    types: evolutionChainPokemon.data.types.map(
                      type => type.type.name,
                    ),
                    name: evolutionChainPokemon.data.name,
                    image_url:
                      evolutionChainPokemon.data.sprites.other.dream_world
                        .front_default,
                  });
                }
              }),
            );

            const selectedPokemonInfo = constructPokemonInfoFromResponses(
              selectedPokemon.data,
              selectedPokemonSpecies.data,
              evolutionChain,
            );
            return selectedPokemonInfo;
          }
        }
      }
    } catch (err) {
      return thunkAPI.rejectWithValue(err);
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
    setCloseDialog: state => {
      state.isOpen = false;
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

export const { setIsOpen, setCloseDialog } = infoDialogSlice.actions;

export default infoDialogSlice.reducer;
