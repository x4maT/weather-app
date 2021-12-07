import React, { useState } from 'react';
import PropTypes from 'prop-types';

const ToggleSwitch = ({ handleToggle, toggled }) => {
  const [toggle, setToggle] = useState(toggled);
  const toggleClass = ' transform translate-x-5';

  const onToggle = () => {
    handleToggle(!toggle);
    setToggle(!toggle);
  };

  return (
    <div className="flex flex-col justify-center items-center ">
      <button
        type="button"
        className="md:w-14 md:h-7 w-12 h-6 flex items-center bg-white rounded-full p-1 cursor-pointer"
        onClick={onToggle}
      >
        <div
          className={`bg-green-500 md:w-6 md:h-6 h-5 w-5 rounded-full shadow-md transform duration-300 ease-in-out${
            toggle ? null : toggleClass
          }`}
        />
      </button>
    </div>
  );
};

ToggleSwitch.propTypes = {
  handleToggle: PropTypes.func.isRequired,
  toggled: PropTypes.bool,
};

ToggleSwitch.defaultProps = {
  toggled: false,
};

export default ToggleSwitch;
