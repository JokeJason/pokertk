import React, { useEffect } from 'react';
import { useGetTypeListQuery } from 'features/Pokedex/pokedexApi';
import {
  setSelectedRegion,
  setSelectedType,
  setSelectedSort,
  fetchPokemonsInTheRegion,
} from 'features/Pokedex/pokedexSlice';
import { RegionPokemonRange } from 'features/Pokedex/types/slice';
import { useAppDispatch, useAppSelector } from 'app/hooks';

export const createRegionPokemonListOptionElements = (
  data: RegionPokemonRange[],
) => {
  return data.map(({ region, startId, endId }) => {
    const value = `${region}`;
    const label = `${
      region.charAt(0).toUpperCase() + region.slice(1)
    } (${startId}-${endId})`;
    return (
      <option key={region} value={value}>
        {label}
      </option>
    );
  });
};

const Filters = () => {
  const dispatch = useAppDispatch();
  const selectedRegion = useAppSelector(state => state.pokedex.selectedRegion);
  const selectedType = useAppSelector(state => state.pokedex.selectedType);
  const selectedSort = useAppSelector(state => state.pokedex.selectedSort);

  const regionPokemonList = useAppSelector(
    state => state.pokedex.regionOptions,
  );
  const sortOptions = useAppSelector(state => state.pokedex.sortOptions);

  const { data: typesData, isLoading: typesLoading } = useGetTypeListQuery();

  useEffect(() => {
    console.log('Filters.tsx useEffect');
  }, []);

  useEffect(() => {
    console.log('REGION changed');
  }, [selectedRegion]);

  const optionElements =
    createRegionPokemonListOptionElements(regionPokemonList);

  return (
    <>
      <div className="filter__container">
        <div className="filter__items">
          <div>
            <div>REGION</div>
            <select
              name="regionSelect"
              onChange={e => {
                dispatch(setSelectedRegion(e.target.value));
                dispatch(fetchPokemonsInTheRegion(e.target.value));
              }}
              value={selectedRegion}
            >
              {optionElements}
            </select>
          </div>
        </div>
        <div className="filter__items">
          <div>
            <div>TYPE</div>
            <select
              name="regionSelect"
              onChange={e => dispatch(setSelectedType(e.target.value))}
              value={selectedType}
            >
              {typesLoading ? (
                <option>Loading...</option>
              ) : (
                typesData?.results.map(type => (
                  <option key={type.name} value={type.name}>
                    {type.name}
                  </option>
                ))
              )}
            </select>
          </div>
        </div>
        <div className="filter__items">
          <div>
            <div>SORT BY</div>
            <select
              name="sortSelect"
              disabled={typesLoading}
              onChange={e => dispatch(setSelectedSort(e.target.value))}
              value={selectedSort}
            >
              {sortOptions.map(option => (
                <option key={option.value} value={option.value}>
                  {option.name}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>
    </>
  );
};

export default Filters;
