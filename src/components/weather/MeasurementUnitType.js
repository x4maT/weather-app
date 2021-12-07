import React from 'react';
import { useSelector, useDispatch, shallowEqual } from 'react-redux';
import classNames from 'classnames';
import { switchMeasurementUnitType } from '../../store/weather/slice';
import ToggleSwitch from '../toggleSwitch';

const MeasurementUnitType = () => {
  const dispatch = useDispatch();
  const { isCelsius } = useSelector(({ weather }) => weather, shallowEqual);

  const handleToggle = () => {
    dispatch(switchMeasurementUnitType());
  };

  return (
    <div className="flex flex-column items-center">
      <span
        className={classNames('font-semibold text-white text-lg mr-2', {
          'text-yellow-500': isCelsius,
        })}
      >
        °C
      </span>
      <ToggleSwitch handleToggle={handleToggle} toggled={isCelsius} />
      <span
        className={classNames('font-semibold text-white text-lg ml-2', {
          'text-yellow-500': !isCelsius,
        })}
      >
        °F
      </span>
    </div>
  );
};

export default MeasurementUnitType;
