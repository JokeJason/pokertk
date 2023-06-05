import { motion } from 'framer-motion';

import './EvolutionSpecies.css';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { colorTypeGradients } from 'components/utils';
import { useAppDispatch } from 'app/hooks';
import { fetchSelectedPokemonInfo } from 'features/InfoDialog/infoDialogSlice';

export type EvolutionSpeciesProps = {
  types: string[];
  name: string;
  image_url: string;
};

const EvolutionSpecies = ({
  types,
  name,
  image_url,
}: EvolutionSpeciesProps) => {
  const dispatch = useAppDispatch();

  const finalColor = colorTypeGradients(types);

  return (
    <div className={'evolution__sub__box'}>
      <div>
        <motion.div
          animate={{ rotate: 360 }}
          transition={{
            duration: 2,
            ease: 'easeOut',
            type: 'spring',
            bounce: 0.65,
            damping: 25,
          }}
          whileHover={{ scale: 1.05 }}
        >
          <div
            className="evolution__img__div"
            style={{
              background: `linear-gradient(${finalColor[0]}, ${finalColor[1]})`,
            }}
          >
            <div className={'transparency__div'}>
              <LazyLoadImage
                alt={'image-pokemon'}
                height={80}
                width={80}
                src={image_url}
                visibleByDefault={false}
                delayMethod={'debounce'}
                effect={'blur'}
                className={'evo_img'}
                onClick={() => dispatch(fetchSelectedPokemonInfo(name))}
              />
            </div>
          </div>
        </motion.div>
        <div className={'evolution__poke__name'}>{name}</div>
      </div>
    </div>
  );
};

export default EvolutionSpecies;
