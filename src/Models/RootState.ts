import { SearchState } from '../Containers/Search/Models';
import { DefaultWeatherInfoState } from '../Containers/DefaultWeatherInfo/Models';
import { LocationWeatherInfoState } from '../Containers/LocationWeatherInfo/Models';

export interface RootState {
  defaultWeatherInfo: DefaultWeatherInfoState;
  locationWeatherInfo: LocationWeatherInfoState;
  searchBox: SearchState;
}
