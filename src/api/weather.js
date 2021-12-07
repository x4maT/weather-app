import httpBase from './httpBase';

export const getForecastByGeoLocation = ({ lat, lon, lang }) =>
  httpBase.get('/weather', {
    params: {
      lat,
      lon,
      lang,
    },
  });

export const getForecastByCityName = ({ cityName, lang }) =>
  httpBase.get('/weather', {
    params: {
      q: cityName,
      lang,
    },
  });
