export type FilterStateProps = {
  regionOptions: RegionPokemonRange[];
  typeOptions: string[];
  sortOptions: { name: string; value: string }[];
  selectedRegion: string;
  selectedType: string;
  selectedSort: string;
  searchInput: string;
};

export type RegionPokemonRange = {
  region: string;
  startId: number;
  endId: number;
};
