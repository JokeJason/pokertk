import { Dialog, DialogContent, Tooltip, Zoom } from '@mui/material';
import ArrowRightAltIcon from '@mui/icons-material/ArrowRightAlt';

import './InfoDialogComponent.css';

import { findPokeTypeAsset } from 'components/PokemonTypes';
import { colorTypeGradients } from 'components/utils';
import GenderRate from 'components/GenderRate';
import Delayed from 'components/Delayed';
import EvolutionSpecies, {
  EvolutionSpeciesProps,
} from 'components/EvolutionSpecies';

interface Stat {
  stat__name: string;
  stat__value: number;
}

export interface InfoDialogComponentProps {
  openDialog: boolean;
  id: number;
  name: string;
  types: string[];
  genera: string;
  image: string;
  height: number;
  weight: number;
  genderRatio: number;
  description: string;
  abilities: string[];
  stats: Stat[];
  evolutionChain: EvolutionSpeciesProps[];
}

const InfoDialog = ({
  openDialog,
  id,
  name,
  types,
  genera,
  image,
  height,
  weight,
  genderRatio,
  description,
  abilities,
  stats,
  evolutionChain,
}: InfoDialogComponentProps) => {
  const finalColor = colorTypeGradients(types);

  return (
    <div>
      <Dialog
        aria-labelledby="customized-dialog-title"
        open={openDialog}
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
              <div className="pokemon__id">#{String(id).padStart(3, '0')}</div>
              <div className="pokemon__name">{name}</div>
              <div
                className="pokemon__genera"
                style={{ background: finalColor[0] }}
              >
                {genera}
              </div>
              <div>
                <img src={image} alt="poke-img" />
              </div>
              <div className="info__container__data__type">
                {types.map(type => (
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
                  {`${height / 10} m/${`${Math.floor(
                    (height / 10) * 3.28,
                  )}'${Math.round((((height / 10) * 3.28) % 1) * 12)}"`} `}
                </p>
                <p>
                  <span
                    className="info__container__headings"
                    style={{ fontSize: '20px' }}
                  >
                    Weight
                  </span>
                  {` ${(weight / 10).toFixed(1)} kg/${(weight * 0.2205).toFixed(
                    1,
                  )} lbs`}
                </p>
              </div>
              <div className="gender__container">
                {genderRatio === -1 ? (
                  'Genderless'
                ) : (
                  <GenderRate genderRatio={genderRatio} />
                )}
              </div>
            </div>
            <div className="info__container__data">
              <div className={'right__box'}>
                <div>
                  <div className={'info__container__headings'}>About</div>
                  <div className={'desc'}>{description}</div>
                </div>
                <div className={'info__container__data__header'}>
                  <div className={'info__container__data__abilities'}>
                    <div className={'info__container__headings'}>Abilities</div>
                    <div className={'ability__list__bg'}>
                      <ul className={'ability__list'}>
                        {abilities.map(ability => (
                          <li key={ability}>
                            <div className={'ability'}>{ability}&nbsp;</div>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
                <div>
                  <div className={'info__container__headings stats'}>
                    Base Stats
                  </div>
                  <div className={'info__container__data__data'}>
                    {stats.map(stat => (
                      <div
                        key={stat['stat__name']}
                        className="info__container__stat__columns"
                      >
                        <div className="info__container__stat__columns__name">
                          {stat.stat__name}
                        </div>
                        <div className="info__container__stat__columns__val">
                          {stat.stat__value}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                <div>
                  <div className={'info__container__headings'}>Evolution</div>
                  <div className={'evolution__box'}>
                    {evolutionChain.map(evo => (
                      <Delayed
                        waitBeforeShow={evolutionChain.indexOf(evo) * 500}
                        key={evo.name}
                      >
                        <EvolutionSpecies
                          types={evo.types}
                          image_url={evo.image_url}
                          name={evo.name}
                        />
                        {evolutionChain.indexOf(evo) + 1 &&
                          evolutionChain.indexOf(evo) <
                            evolutionChain.length - 1 && (
                            <div className={'evolution__sub__box'}>
                              <ArrowRightAltIcon
                                className={'arrow__right'}
                              ></ArrowRightAltIcon>
                            </div>
                          )}
                      </Delayed>
                    ))}
                  </div>
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
