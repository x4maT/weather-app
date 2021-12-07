import React from 'react';
import CurrentCityCard from '../weather/CurrentCity';
import FavoriteList from '../weather/FavoriteList';

const Main = () => {
  return (
    <div className="flex h-full">
      <main className="flex flex-col w-full bg-white overflow-x-hidden overflow-y-auto mb-14">
        <div className="flex w-full mx-auto px-6 py-8">
          <div className="flex flex-col w-full h-full text-gray-900 text-md">
            <FavoriteList />
          </div>
        </div>
      </main>
      <div className="flex lex-col w-4/12 h-full bg-gray-100">
        <CurrentCityCard />
      </div>
    </div>
  );
};

export default Main;
