import { Option } from 'react-select/src/filters';
import { BaseContainerState } from '../BaseContainerState';

export interface Location {
  title: string;
  location_type: 'City' | 'Region / State / Province' | 'Country' | 'Continent';
  latt_long: string; // floats, comma separated
  woeid: number;
  distance: number;
}
export interface SearchState extends BaseContainerState {
  searchText: string;
  locationLattLongToDataMap: { [key: string]: Location };
  locationOptions?: Option[];
  selectedLocationOption: Option | null;
}
