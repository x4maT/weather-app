import React from 'react';
import { useSelector } from 'react-redux';
import InfoCard from './InfoCard';

const CurrentCityCard = () => {
  const { cities } = useSelector(({ weather }) => weather);
  const currentCity = cities.find((city) => city.current);

  if (!currentCity) {
    return null;
  }

  return (
    <div className="current-city mx-auto my-auto">
      <InfoCard weatherData={currentCity} />
    </div>
  );
};

export default CurrentCityCard;
