import React from 'react';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';

import './PokemonCard.css';
import { colorTypeGradients } from 'components/utils';
import PokemonTypes from 'components/PokemonTypes/PokemonTypes';

export interface PokemonCardProps {
  id: number;
  name: string;
  image: string;
  types: string[];
}

type PokemonCardPropsActionable = PokemonCardProps & {
  onClickAction: () => void;
};

export function formatNumber(num: number) {
  return '#' + num.toString().padStart(3, '0');
}

const PokemonCard = ({
  id,
  name,
  image,
  types,
  onClickAction,
}: PokemonCardPropsActionable) => {
  const finalColor = colorTypeGradients(types);

  return (
    <div
      className="thumbnail__container noselect"
      style={{
        background: `linear-gradient(${finalColor[0]}, ${finalColor[1]})`,
      }}
    >
      <div className="card__header">
        <div className="poke__number">{formatNumber(id)}</div>
        <div className="info__icon">
          <svg
            stroke="currentColor"
            fill="currentColor"
            strokeWidth="0"
            viewBox="0 0 512 512"
            height="1em"
            width="1em"
            xmlns="http://www.w3.org/2000/svg"
            onClick={onClickAction}
          >
            <path d="M256 8C119.043 8 8 119.083 8 256c0 136.997 111.043 248 248 248s248-111.003 248-248C504 119.083 392.957 8 256 8zm0 110c23.196 0 42 18.804 42 42s-18.804 42-42 42-42-18.804-42-42 18.804-42 42-42zm56 254c0 6.627-5.373 12-12 12h-88c-6.627 0-12-5.373-12-12v-24c0-6.627 5.373-12 12-12h12v-64h-12c-6.627 0-12-5.373-12-12v-24c0-6.627 5.373-12 12-12h64c6.627 0 12 5.373 12 12v100h12c6.627 0 12 5.373 12 12v24z"></path>
          </svg>
        </div>
      </div>
      <div className="image__container">
        <LazyLoadImage
          alt={name}
          height={150}
          src={image}
          visibleByDefault={false}
          delayMethod={'debounce'}
          effect="blur"
          className="img_thumbnail"
        />
      </div>
      <div className="poke__name">
        <h3>{name}</h3>
        <div className="poke__type">
          <PokemonTypes types={types} />
        </div>
      </div>
    </div>
  );
};

export default PokemonCard;
