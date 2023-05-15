import { Dialog, DialogContent, Tooltip, Zoom } from '@mui/material';

import { findPokeTypeAsset } from 'components/PokemonTypes';
import { colorTypeGradients } from 'components/utils';
import GenderRate from 'components/GenderRate';

export interface InfoDialogProps {
  open: boolean;
  cancel: boolean;
  id: number;
  name: string;
  genere: string;
  types: string[];
  height: number;
  weight: number;
  genderRatio: number;
  description: string;
  abilities: string[];
  stats: {
    hp: number;
    attack: number;
    defense: number;
    spAttack: number;
    spDefense: number;
    speed: number;
  };
  image: string;
}

const InfoDialog = (props: InfoDialogProps) => {
  let finalColor;

  if (props.types.length === 2) {
    finalColor = colorTypeGradients(
      props.types[0],
      props.types[1],
      props.types.length,
    );
  } else {
    finalColor = colorTypeGradients(
      props.types[0],
      props.types[0],
      props.types.length,
    );
  }

  return (
    <div>
      <Dialog
        aria-labelledby="customized-dialog-title"
        open={props.open}
        fullWidth
        maxWidth="md"
        className="dialog__bg noselect"
      >
        <DialogContent
          style={{
            background: `linear-gradient(${finalColor[0]}, ${finalColor[1]})`,
          }}
          className="dialog__content"
        >
          <div className="info__container">
            <div className="info__container__img">
              <div className="pokemon__id">
                #{String(props.id).padStart(3, '0')}
              </div>
              <div className="pokemon__name">{props.name}</div>
              <div
                className="pokemon__genera"
                style={{ background: finalColor[0] }}
              >
                {props.genere}
              </div>
              <div>
                <img src={props.image} alt="poke-img" />
              </div>
              <div className="info__container__data__type">
                {props.types.map(type => (
                  <Tooltip
                    title={type}
                    key={type}
                    TransitionComponent={Zoom}
                    arrow
                  >
                    <div className={`poke__type__bg ${type}`}>
                      <img src={findPokeTypeAsset(type)} alt="poke-type" />
                    </div>
                  </Tooltip>
                ))}
              </div>
              <div className="dimensions">
                <p>
                  <span
                    className="info__container__headings"
                    style={{ fontSize: '20px' }}
                  >
                    Height
                  </span>
                </p>
                <p>
                  <span
                    className="info__container__headings"
                    style={{ fontSize: '20px' }}
                  >
                    Weight
                  </span>
                </p>
              </div>
              <div className="gender__container">
                {props.genderRatio === -1 ? (
                  'Genderless'
                ) : (
                  <GenderRate genderRatio={props.genderRatio} />
                )}
              </div>
            </div>
            <div className="info__container__data">
              <div className={'right__box'}>
                <div>
                  <div className={'info__container__headings'}>About</div>
                  <div className={'desc'}>{props.description}</div>
                </div>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default InfoDialog;
