import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import InfoCard from './InfoCard';

const FavoriteList = () => {
  const { cities } = useSelector(({ weather }) => weather);
  const [favoriteList, setFavoriteList] = useState([]);

  useEffect(() => {
    setFavoriteList(cities.filter((city) => !city.current));
  }, [cities]);

  if (favoriteList.length === 0) {
    return null;
  }

  return (
    <div className="favorite grid gap-3 grid-cols-1 md:grid-cols-4">
      {favoriteList.map((city) => (
        <InfoCard weatherData={city} key={city.id} />
      ))}
    </div>
  );
};

export default FavoriteList;
