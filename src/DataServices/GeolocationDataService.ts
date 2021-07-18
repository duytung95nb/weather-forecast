import { DefaultLocation as DefaultLocation } from '../Models/DefaultLocation';
import APP_CONSTANT from '../Constants/AppConstant';
import { Location } from '../Containers/Search/Models';
import AxiosOriginal from './AxiosOriginal';
import AxiosAdapter from './AxiosAdapter';
class GeolocationDataService {
  getByIpAddress() {
    return AxiosOriginal.get<DefaultLocation>('http://www.geoplugin.net/json.gp');
  }
  searchByText(text: string) {
    return AxiosAdapter.get<Location[]>(
      `${APP_CONSTANT.META_WEATHER_API}/location/search/?query=${text}`,
    );
  }
  searchByLatLong(lat: number, long: number) {
    // Example 36.96,-122.02
    return AxiosAdapter.get<Location>(
      `${APP_CONSTANT.META_WEATHER_API}/location/search/?lattlong=${lat},${long}`,
    );
  }
}
const geolocationDataService = new GeolocationDataService();
export default geolocationDataService;
