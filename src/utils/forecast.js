const compassDirections = [
  'N',
  'NNE',
  'NE',
  'ENE',
  'E',
  'ESE',
  'SE',
  'SSE',
  'S',
  'SSW',
  'SW',
  'WSW',
  'W',
  'WNW',
  'NW',
  'NNW',
];

export const celsiusToFahrenheit = (celsius) =>
  Math.round(celsius * (9 / 5) + 32);

export const normalizeTemperature = (temperature, isCelsius = true) => {
  return isCelsius ? Math.round(temperature) : celsiusToFahrenheit(temperature);
};

export const degreeToCompassDirection = (degrees) => {
  const result = Math.floor(degrees / 22.5 + 0.5);

  return compassDirections[result % 16];
};
