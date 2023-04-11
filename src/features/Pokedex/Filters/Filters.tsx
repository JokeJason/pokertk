import React, { useEffect } from 'react';
import { useGetTypeListQuery } from 'features/Pokedex/pokedexApi';
import {
  setSelectedRegion,
  setSelectedType,
  setSelectedSort,
  fetchPokemonsInTheRegion,
  setRegionOptions,
  setSortOptions,
  setTypeOptions,
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

const useGetRegionOptions = () => {
  const data: RegionPokemonRange[] = [
    { region: 'kanto', startId: 1, endId: 151 },
    { region: 'johto', startId: 152, endId: 251 },
    { region: 'hoenn', startId: 252, endId: 386 },
    { region: 'sinnoh', startId: 387, endId: 493 },
    { region: 'unova', startId: 494, endId: 649 },
    { region: 'kalos', startId: 650, endId: 721 },
    { region: 'alola', startId: 722, endId: 809 },
    { region: 'galar', startId: 810, endId: 898 },
  ];
  return { data: data };
};

const useGetSortOptions = () => {
  const data = [
    { name: 'ID', value: 'id' },
    { name: 'Name', value: 'name' },
  ];

  return { data: data };
};

const Filters = () => {
  const dispatch = useAppDispatch();
  const selectedRegion = useAppSelector(state => state.pokedex.selectedRegion);
  const selectedType = useAppSelector(state => state.pokedex.selectedType);
  const selectedSort = useAppSelector(state => state.pokedex.selectedSort);

  const regionPokemonList = useAppSelector(
    state => state.pokedex.regionOptions,
  );

  const { data: fetchedRegionOptions } = useGetRegionOptions();
  const { data: fetchedTypeOptions, isLoading: isFetchingTypeOptions } =
    useGetTypeListQuery();
  const { data: fetchedSortOptions } = useGetSortOptions();

  useEffect(() => {
    dispatch(setRegionOptions(fetchedRegionOptions));
    dispatch(setSortOptions(fetchedSortOptions));

    if (!isFetchingTypeOptions && fetchedTypeOptions) {
      dispatch(setTypeOptions(fetchedTypeOptions.results));
    }

    dispatch(setSelectedRegion(fetchedRegionOptions[0].region));
    dispatch(fetchPokemonsInTheRegion(fetchedRegionOptions[0].region));
  }, []);

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
              {isFetchingTypeOptions ? (
                <option>Loading...</option>
              ) : (
                fetchedTypeOptions?.results.map(type => (
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
              disabled={isFetchingTypeOptions}
              onChange={e => dispatch(setSelectedSort(e.target.value))}
              value={selectedSort}
            >
              {fetchedSortOptions.map(option => (
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
