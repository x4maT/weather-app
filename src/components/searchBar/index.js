import React from 'react';
import PropTypes from 'prop-types';
import { useIntl } from 'react-intl';
import classNames from 'classnames';

const SearchBar = ({ handleChange, inputValue, handleSubmit }) => {
  const intl = useIntl();
  const disabled = inputValue.trim().length <= 0;

  const handleEnter = (event) =>
    !disabled && event.key === 'Enter' && handleSubmit(event);

  return (
    <div className="search">
      <div className="w-4/12 h-10 sm:w-auto pl-3 pr-2 bg-white border rounded-full flex justify-between items-center relative">
        <input
          type="search"
          name="search"
          id="search"
          placeholder={intl.formatMessage({
            id: 'searchCityPlaceholder',
          })}
          className="appearance-none w-full outline-none focus:outline-none active:outline-none"
          value={inputValue}
          onChange={handleChange}
          onKeyUp={handleEnter}
        />
        <button
          type="submit"
          className={classNames({
            ...(disabled && {
              disabled,
              'cursor-not-allowed': true,
            }),
          })}
          disabled={disabled}
          onClick={handleSubmit}
        >
          <svg
            fill="none"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            viewBox="0 0 24 24"
            className="w-6 h-6"
          >
            <path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </button>
      </div>
    </div>
  );
};
SearchBar.propTypes = {
  handleChange: PropTypes.func.isRequired,
  inputValue: PropTypes.string,
  handleSubmit: PropTypes.func.isRequired,
};

SearchBar.defaultProps = {
  inputValue: '',
};

export default SearchBar;
