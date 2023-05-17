import { useEffect } from 'react';

import { useAppDispatch, useAppSelector } from 'app/hooks';

import InfoDialogComponent from 'components/InfoDialogComponent';
import {
  useGetPokemonQuery,
  useGetPokemonSpeciesQuery,
  useGetEvolutionChainQuery,
} from 'app/services/pokeApi';
import { setPokemonSpeciesIdToFetch } from './infoDialogSlice';

export interface InfoDialogProps {
  open: boolean;
  pokemonId: string | number;
}

const InfoDialog = ({ pokemonId }: InfoDialogProps) => {
  const dispatch = useAppDispatch();

  const isOpen = useAppSelector(state => state.infoDialog.isOpen);
  const skipGetPokemonSpeciesQuery = useAppSelector(
    state => state.infoDialog.skipGetPokemonSpeciesQuery,
  );
  const skipGetEvolutionChainQuery = useAppSelector(
    state => state.infoDialog.skipGetEvolutionChainQuery,
  );
  const selectedPokemonId = useAppSelector(
    state => state.infoDialog.selectedPokemonId,
  );

  return (
    <>
      <InfoDialogComponent
        openDialog={isOpen}
        id={selectedPokemonId}
        name={}
        types={}
        genera={}
        image={}
        height={}
        weight={}
        genderRatio={}
        description={}
        abilities={}
        stats={}
        evolutionChain={}
      />
    </>
  );
};

export default InfoDialog;
