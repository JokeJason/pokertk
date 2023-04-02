import React, { useEffect } from 'react';
import { useGetTypeListQuery } from 'features/Pokedex/pokedexApi';
import {
  setSelectedRegion,
  setSelectedType,
  setSelectedSort,
} from 'features/Pokedex/pokedexSlice';
import { RegionPokemonRange } from 'features/Pokedex/types/slice';
import { useAppDispatch, useAppSelector } from 'app/hooks';

const useGetSortOptions = () => {
  const sortOptions = [
    { name: 'ID', value: 'id' },
    { name: 'Name', value: 'name' },
  ];
  return { data: sortOptions };
};

export const useGetRegionPokemons = () => {
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

  const handleRegionChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    dispatch(setSelectedRegion(event.target.value));
  };
  const handleTypeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    dispatch(setSelectedType(event.target.value));
  };
  const handleSortChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    dispatch(setSelectedSort(event.target.value));
  };

  const { data: typesData, isLoading: typesLoading } = useGetTypeListQuery();
  const { data: sortOptions } = useGetSortOptions();
  const { data: regionPokemonListData } = useGetRegionPokemons();

  // Action when loading the component
  useEffect(() => {
    const initailRegion = Object.keys(regionPokemonListData)[0];
    if (initailRegion) {
      const initialEvent = {
        target: { value: initailRegion },
      } as React.ChangeEvent<HTMLSelectElement>;
      handleRegionChange(initialEvent);
    }

    if (sortOptions && sortOptions.length > 0) {
      const initialSortEvent = {
        target: { value: sortOptions[0].value },
      } as React.ChangeEvent<HTMLSelectElement>;
      handleSortChange(initialSortEvent);
    }
  }, []);

  // Send the first type as the default selected type
  useEffect(() => {
    if (typesData && typesData.results.length > 0) {
      const initialTypeEvent = {
        target: { value: typesData.results[0].name },
      } as React.ChangeEvent<HTMLSelectElement>;
      handleTypeChange(initialTypeEvent);
    }
  }, [typesData]);

  const optionElements = createRegionPokemonListOptionElements(
    regionPokemonListData,
  );
  return (
    <>
      <div className="filter__container">
        <div className="filter__items">
          <div>
            <div>REGION</div>
            <select
              name="regionSelect"
              onChange={handleRegionChange}
              value={Object.keys(regionPokemonListData)[0]}
            >
              {optionElements}
            </select>
          </div>
        </div>
        <div className="filter__items">
          <div>
            <div>TYPE</div>
            <select name="regionSelect" onChange={handleTypeChange}>
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
              onChange={handleSortChange}
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
