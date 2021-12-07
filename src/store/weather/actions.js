import { GET_BY_GEO_LOCATION, GET_BY_CITY_NAME } from './actionTypes';

const getByGeoLocation = ({ lat, lon, lang, current }) => ({
  type: GET_BY_GEO_LOCATION,
  payload: {
    lat,
    lon,
    lang,
    current,
  },
});

const getByCityName = ({ cityName, lang }) => ({
  type: GET_BY_CITY_NAME,
  payload: {
    cityName,
    lang,
  },
});

export { getByGeoLocation, getByCityName };
