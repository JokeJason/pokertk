import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from 'app/hooks';
import { fetchPokemonsInTheRegion } from 'features/Pokedex/pokedexSlice';

import {
  setSelectedRegion,
  setSelectedType,
  setSelectedSort,
  setRegionOptions,
  setTypeOptions,
  setSortOptions,
  setSearchInput,
} from './filterSlice';
import { useGetTypeListQuery } from './filterApi';
import { RegionPokemonRange } from './types/slice';
import './Filters.css';

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

export const useGetRegionOptions = () => {
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
  const selectedRegion = useAppSelector(state => state.filter.selectedRegion);
  const selectedType = useAppSelector(state => state.filter.selectedType);
  const selectedSort = useAppSelector(state => state.filter.selectedSort);
  const searchInput = useAppSelector(state => state.filter.searchInput);

  const regionPokemonList = useAppSelector(state => state.filter.regionOptions);

  const { data: fetchedRegionOptions } = useGetRegionOptions();
  const { data: fetchedTypeOptions, isLoading: isFetchingTypeOptions } =
    useGetTypeListQuery();
  const { data: fetchedSortOptions } = useGetSortOptions();

  useEffect(() => {
    dispatch(setRegionOptions(fetchedRegionOptions));
    dispatch(setSortOptions(fetchedSortOptions));

    dispatch(setSelectedRegion(fetchedRegionOptions[0].region));

    dispatch(setSelectedSort(fetchedSortOptions[0].value));
  }, []);

  useEffect(() => {
    if (!isFetchingTypeOptions && fetchedTypeOptions) {
      dispatch(setTypeOptions(fetchedTypeOptions.results));
      dispatch(setSelectedType(fetchedTypeOptions.results[0].name));
    }
  }, [isFetchingTypeOptions]);

  const optionElements =
    createRegionPokemonListOptionElements(regionPokemonList);

  return (
    <>
      <div className="filter__container noselect">
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
        <div className="filter__items">
          <div>
            <div>SEARCH</div>
            <input
              type="text"
              onChange={e => dispatch(setSearchInput(e.target.value))}
              value={searchInput}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default Filters;
