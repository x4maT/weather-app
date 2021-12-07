import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { useSelector, useDispatch } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import {
  isExpired,
  timeDistanceToNow,
  today,
  localeDate,
} from '../../utils/dateTime';
import {
  degreeToCompassDirection,
  normalizeTemperature,
} from '../../utils/forecast';
import { getByGeoLocation } from '../../store/weather/actions';
import { deleteCityById } from '../../store/weather/slice';

const normalizeDescription = (list) => {
  if (list.length === 0) {
    return null;
  }

  if (list.length === 1) {
    return <span key={list[0].id}>{list[0].description}</span>;
  }

  const lastItem = list[list.length - 1];

  return list.map((item) =>
    item === lastItem ? (
      <span key={item.id}>{item.description}</span>
    ) : (
      <span key={item.id}>{`${item.description}, `}</span>
    ),
  );
};

const InfoCard = ({ weatherData }) => {
  const dispatch = useDispatch();
  const { locale } = useSelector(({ common }) => common);
  const { isCelsius } = useSelector(({ weather }) => weather);

  const temperaturePrefix = isCelsius ? '°C' : '°F';
  const windSpeedPrefix = isCelsius ? 'm/s' : 'mph';

  useEffect(() => {
    const { dt: updatedAt, coord, lang } = weatherData;

    if (isExpired(updatedAt) || locale !== lang) {
      dispatch(
        getByGeoLocation({
          ...coord,
          lang: locale,
        }),
      );
    }
  }, [locale]);

  const {
    name: cityName,
    current,
    dt: updatedAt,
    main: { temp: temperature, feels_like: feelsLike, pressure, humidity },
    sys: { country, sunrise, sunset, id },
    weather,
    wind,
  } = weatherData;

  return (
    <div className="group min-w-full md:min-w-0">
      <div className="card bg-white bg-opacity-75 duration-500 rounded-xl mb-2 px-2 md:h-auto mb-2 shadow-lg lg:transform hover:scale-105">
        {/* Delete button */}
        {!current && (
          <button
            type="button"
            className="bg-red-300 w-4 hover:bg-red-500 text-gray-800 font-bold rounded inline-flex items-center float-right opacity-0 group-hover:opacity-100"
            onClick={() => dispatch(deleteCityById({ id }))}
          >
            <svg
              className="fill-current w-4 h-4 mx-auto"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
            >
              <path d="M14.348 14.849a1.2 1.2 0 0 1-1.697 0L10 11.819l-2.651 3.029a1.2 1.2 0 1 1-1.697-1.697l2.758-3.15-2.759-3.152a1.2 1.2 0 1 1 1.697-1.697L10 8.183l2.651-3.031a1.2 1.2 0 1 1 1.697 1.697l-2.758 3.152 2.758 3.15a1.2 1.2 0 0 1 0 1.698z" />
            </svg>
          </button>
        )}

        {/* Main weather info, TODO: split to small info components, add images/icons */}
        <div className="p-3 space-y-2 space-x-2">
          <h1 className="font-bold underline text-2xl text-blue-800 inline-block m-2">
            <FormattedMessage id={cityName} />
          </h1>
          <span>{`(${country})`}</span>
        </div>

        <div className="flex w-full justify-between px-5 text-xs">
          <span>
            <FormattedMessage id="temperature" />
          </span>
          <span>
            {normalizeTemperature(temperature, isCelsius)}
            {temperaturePrefix}
          </span>
        </div>

        <div className="flex w-full justify-between px-5 text-xs">
          <span>
            <FormattedMessage id="feelsLike" />
          </span>
          <span>
            {normalizeTemperature(feelsLike, isCelsius)}
            {temperaturePrefix}
          </span>
        </div>

        <div className="flex w-full justify-between px-5 text-xs">
          <span>
            <FormattedMessage id="precipitation" />
          </span>
          <span>{normalizeDescription(weather)}</span>
        </div>

        <div className="flex w-full justify-between px-5 text-xs">
          <span>
            <FormattedMessage id="pressure" />
          </span>
          <span>{pressure}</span>
        </div>

        <div className="flex w-full justify-between px-5 text-xs">
          <span>
            <FormattedMessage id="wind" />
          </span>
          <span>
            {wind.speed}
            {windSpeedPrefix}
          </span>
        </div>

        <div className="flex w-full justify-between px-5 text-xs">
          <span>
            <FormattedMessage id="direction" />
          </span>
          <span>{degreeToCompassDirection(weatherData.wind.deg)}</span>
        </div>

        <div className="flex w-full justify-between px-5 text-xs">
          <span>
            <FormattedMessage id="humidity" />
          </span>
          <span>{`${humidity}%`}</span>
        </div>

        <div className="flex w-full justify-between px-5 text-xs">
          <span>
            <FormattedMessage id="sunrise" />
          </span>
          <span>{localeDate(sunrise, 'h:mm a', locale)}</span>
        </div>

        <div className="flex w-full justify-between px-5 text-xs">
          <span>
            <FormattedMessage id="sunset" />
          </span>
          <span>{localeDate(sunset, 'h:mm a', locale)}</span>
        </div>

        <div>
          <span className="text-gray-600 inline-block italic text-xs my-2">
            <p>{today(locale)}</p>
            <FormattedMessage id="updatedAt" />
            {`: ${timeDistanceToNow(updatedAt, locale)}`}
          </span>
        </div>
      </div>
    </div>
  );
};

InfoCard.propTypes = {
  weatherData: PropTypes.shape({
    id: PropTypes.number.isRequired,
    dt: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    lang: PropTypes.string.isRequired,
    current: PropTypes.bool,
    clouds: PropTypes.shape({
      all: PropTypes.number.isRequired,
    }).isRequired,
    wind: PropTypes.shape({
      speed: PropTypes.number.isRequired,
      deg: PropTypes.number.isRequired,
    }).isRequired,
    coord: PropTypes.shape({
      lon: PropTypes.number.isRequired,
      lat: PropTypes.number.isRequired,
    }).isRequired,
    sys: PropTypes.shape({
      type: PropTypes.number.isRequired,
      id: PropTypes.number.isRequired,
      country: PropTypes.string.isRequired,
      sunrise: PropTypes.number.isRequired,
      sunset: PropTypes.number.isRequired,
    }).isRequired,
    main: PropTypes.shape({
      temp: PropTypes.number.isRequired,
      feels_like: PropTypes.number.isRequired,
      temp_min: PropTypes.number.isRequired,
      temp_max: PropTypes.number.isRequired,
      pressure: PropTypes.number.isRequired,
      humidity: PropTypes.number.isRequired,
    }).isRequired,
    weather: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number.isRequired,
        main: PropTypes.string.isRequired,
        description: PropTypes.string.isRequired,
        icon: PropTypes.string.isRequired,
      }),
    ).isRequired,
  }).isRequired,
};

export default InfoCard;
