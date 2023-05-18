import { useAppDispatch, useAppSelector } from 'app/hooks';

import InfoDialogComponent from 'components/InfoDialogComponent';
import { setCloseDialog } from './infoDialogSlice';

export interface InfoDialogProps {
  open: boolean;
  pokemonId: string | number;
}

const InfoDialog = () => {
  const dispatch = useAppDispatch();

  const isOpen = useAppSelector(state => state.infoDialog.isOpen);
  const selectedInfoDialogDetails = useAppSelector(
    state => state.infoDialog.InfoDialogDetails,
  );

  return (
    <>
      <InfoDialogComponent
        openDialog={isOpen}
        closeDialog={() => dispatch(setCloseDialog(null))}
        id={selectedInfoDialogDetails.id}
        name={selectedInfoDialogDetails.name}
        types={selectedInfoDialogDetails.types}
        genera={selectedInfoDialogDetails.genera}
        image={selectedInfoDialogDetails.image}
        height={selectedInfoDialogDetails.height}
        weight={selectedInfoDialogDetails.weight}
        genderRatio={selectedInfoDialogDetails.genderRatio}
        description={selectedInfoDialogDetails.description}
        abilities={selectedInfoDialogDetails.abilities}
        stats={selectedInfoDialogDetails.stats}
        evolutionChain={selectedInfoDialogDetails.evolutionChain}
      />
    </>
  );
};

export default InfoDialog;
