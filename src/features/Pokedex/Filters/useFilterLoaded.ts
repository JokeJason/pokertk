import { useState, useEffect } from 'react';
import { useGetRegionListQuery, useGetTypeListQuery } from '../pokedexApi';

const useFilterLoaded = () => {
  const { isLoading: isLoadingRegionList } = useGetRegionListQuery();
  const { isLoading: isLoadingTypeList } = useGetTypeListQuery();
  const [isFilterLoaded, setIsFilterLoaded] = useState(false);

  useEffect(() => {
    if (!isLoadingRegionList && !isLoadingTypeList) {
      setIsFilterLoaded(true);
    }
  }, [isLoadingRegionList, isLoadingTypeList]);

  return isFilterLoaded;
};

export default useFilterLoaded;
