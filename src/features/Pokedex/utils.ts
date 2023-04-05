import { RegionPokemonRange } from './types/slice';

export const getStartAndEndIdsForRegion = (
  region: string,
  data: RegionPokemonRange[],
): { startId: number; endId: number } => {
  const regionData = data.find(data => data.region === region);
  return regionData
    ? { startId: regionData.startId, endId: regionData.endId }
    : { startId: 0, endId: 0 };
};
