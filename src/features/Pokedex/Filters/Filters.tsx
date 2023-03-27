import React, { useEffect } from 'react';
import {
  useGetRegionListQuery,
  useGetTypeListQuery,
} from 'features/Pokedex/pokedexApi';
import {
  setSelectedRegion,
  setSelectedType,
  setSelectedSort,
} from 'features/Pokedex/pokedexSlice';
import { useAppDispatch } from 'app/hooks';

const useGetSortOptions = () => {
  const sortOptions = [
    { name: 'ID', value: 'id' },
    { name: 'Name', value: 'name' },
  ];
  return { data: sortOptions };
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

  const {
    data: regionsData,
    error: regionsError,
    isLoading: regionsLoading,
  } = useGetRegionListQuery();
  const {
    data: typesData,
    error: typesError,
    isLoading: typesLoading,
  } = useGetTypeListQuery();
  const { data: sortOptions } = useGetSortOptions();

  // Send the first region as the default selected region
  useEffect(() => {
    if (regionsData && regionsData.results.length > 0) {
      dispatch(setSelectedRegion(regionsData.results[0].name));
    }
  }, [regionsData, dispatch]);

  // Send the first type as the default selected type
  useEffect(() => {
    if (typesData && typesData.results.length > 0) {
      dispatch(setSelectedType(typesData.results[0].name));
    }
  }, [typesData, dispatch]);

  return (
    <>
      <div className="filter__container">
        <div className="filter__items">
          <div>
            <div>REGION</div>
            <select
              name="regionSelect"
              disabled={regionsLoading}
              onChange={handleRegionChange}
            >
              {regionsLoading ? (
                <option>Loading...</option>
              ) : (
                regionsData?.results.map(region => (
                  <option key={region.name} value={region.name}>
                    {region.name}
                  </option>
                ))
              )}
            </select>
          </div>
        </div>
        <div className="filter__items">
          <div>
            <div>TYPE</div>
            <select
              name="regionSelect"
              disabled={regionsLoading}
              onChange={handleTypeChange}
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
