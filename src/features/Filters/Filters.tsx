import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from 'app/hooks';

import {
  setSelectedRegion,
  setSelectedType,
  setSelectedSort,
  setSearchInput,
  initializeFilterSlice,
} from './filterSlice';
import { useGetTypeListQuery } from 'app/services/pokeRestApi';
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

const Filters = () => {
  const dispatch = useAppDispatch();

  const typeOptions = useAppSelector(state => state.filter.typeOptions);
  const sortOptions = useAppSelector(state => state.filter.sortOptions);
  const regionOptions = useAppSelector(state => state.filter.regionOptions);
  const selectedRegion = useAppSelector(state => state.filter.selectedRegion);
  const selectedType = useAppSelector(state => state.filter.selectedType);
  const selectedSort = useAppSelector(state => state.filter.selectedSort);
  const searchInput = useAppSelector(state => state.filter.searchInput);

  const { isLoading: isFetchingTypeOptions } = useGetTypeListQuery();

  useEffect(() => {
    dispatch(initializeFilterSlice());
  }, [dispatch]);

  return (
    <>
      <div className="filter__container noselect">
        <div className="filter__items">
          <div>REGION</div>
          <select
            name={'regionSelect'}
            onChange={e => dispatch(setSelectedRegion(e.target.value))}
            value={selectedRegion}
          >
            {createRegionPokemonListOptionElements(regionOptions)}
          </select>
        </div>
        <div className="filter__items">
          <div>TYPE</div>
          <select
            name={'typeSelect'}
            onChange={e => dispatch(setSelectedType(e.target.value))}
            value={selectedType}
          >
            {isFetchingTypeOptions ? (
              <option>Loading...</option>
            ) : (
              typeOptions.map(type => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))
            )}
          </select>
        </div>
        <div className="filter__items">
          <div>SORT BY</div>
          <select
            name={'sortSelect'}
            disabled={isFetchingTypeOptions}
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
        <div className="filter__items">
          <div>SEARCH</div>
          <input
            type={'text'}
            onChange={e => dispatch(setSearchInput(e.target.value))}
            value={searchInput}
          />
        </div>
      </div>
    </>
  );
};

export default Filters;
