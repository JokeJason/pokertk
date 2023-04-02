import React, { useEffect } from 'react';
import {
  useGetTypeListQuery,
  useGetRegionPokemonListQuery,
} from 'features/Pokedex/pokedexApi';
import {
  setSelectedRegion,
  setSelectedType,
  setSelectedSort,
  setFetchingRegionPokemonList,
} from 'features/Pokedex/pokedexSlice';
import { useAppDispatch, useAppSelector } from 'app/hooks';
import RegionPokemonList from 'features/Pokedex/RegionPokemonsList.json';

const useGetSortOptions = () => {
  const sortOptions = [
    { name: 'ID', value: 'id' },
    { name: 'Name', value: 'name' },
  ];
  return { data: sortOptions };
};

interface RegionPokemonIdRange {
  startid: number;
  endid: number;
}

interface RegionPokemonListData {
  [key: string]: RegionPokemonIdRange;
}

const regionPokemonListData: RegionPokemonListData = RegionPokemonList;

export const createOptionElements = () => {
  const data = regionPokemonListData;
  return Object.entries(data).map(([region, { startid, endid }]) => {
    const value = `${region}`;
    const label = `${
      region.charAt(0).toUpperCase() + region.slice(1)
    } (${startid}-${endid})`;
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

  // Send the first region as the default selected region
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

  const selectedRegion = useAppSelector(state => state.pokedex.selectedRegion);

  const { refetch: refetchRegionPokemonList } = useGetRegionPokemonListQuery(
    selectedRegion,
    { skip: !selectedRegion },
  );

  useEffect(() => {
    if (selectedRegion) {
      dispatch(setFetchingRegionPokemonList(true));
      refetchRegionPokemonList();
      dispatch(setFetchingRegionPokemonList(false));
    }
  }, [selectedRegion, refetchRegionPokemonList]);

  const optionElements = createOptionElements();
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
