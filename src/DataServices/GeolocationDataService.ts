import { DefaultLocation as DefaultLocation } from '../Models/DefaultLocation';
import APP_CONSTANT from '../Constants/AppConstant';
import AxiosAdapter from './AxiosAdapter';
import { Location } from '../Containers/Search/Models';
class GeolocationDataService {
  getByIpAddress() {
    return AxiosAdapter.get<DefaultLocation>('http://www.geoplugin.net/json.gp');
  }
  searchByText(text: string) {
    return AxiosAdapter.get<Location[]>(
      `${APP_CONSTANT.META_WEATHER_API}/location/search/?query=${text}`,
    );
  }
  searchByLatLong(lat: number, long: number) {
    // Example 36.96,-122.02
    return AxiosAdapter.get<Location>(
      // eslint-disable-next-line max-len
      `${APP_CONSTANT.META_WEATHER_API}/location/search/?lattlong=${lat},${long}`,
    );
  }
}
const geolocationDataService = new GeolocationDataService();
export default geolocationDataService;
