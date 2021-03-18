import axios from 'axios';
import { DefaultLocation as DefaultLocation } from '../Models/DefaultLocation';
import APP_CONSTANT from '../Constants/AppConstant';
class GeolocationDataService {
    getByIpAddress() {
        return axios
            .get<DefaultLocation>('http://www.geoplugin.net/json.gp')
            .then((result) => result.data);
    }
    searchByText(text: string) {
        return axios.get(
            `${APP_CONSTANT.META_WEATHER_API}/location/search/?query=${text}`,
        );
    }
    searchByLatLong(lat: number, long: number) {
        // Example 36.96,-122.02
        return axios.get(
            // eslint-disable-next-line max-len
            `${APP_CONSTANT.META_WEATHER_API}/location/search/?lattlong=${lat},${long}`,
        );
    }
}
const geolocationDataService = new GeolocationDataService();
export default geolocationDataService;
