import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { UKRAINE, ENGLISH } from '../../i18n/locales';

const Header = ({ currentLocale, handleChange }) => {
  const languages = [
    { name: 'US', code: ENGLISH },
    { name: 'UK', code: UKRAINE },
  ];

  return (
    <header className="App-header">
      <h1>header {currentLocale}</h1>
      <div className="switcher">
        <FormattedMessage id="languages" />
        <select onChange={handleChange} value={currentLocale}>
          {languages.map(({ name, code }) => (
            <option key={code} value={code}>
              {name}
            </option>
          ))}
        </select>
      </div>
    </header>
  );
};

Header.propTypes = {
  currentLocale: PropTypes.string.isRequired,
  handleChange: PropTypes.func.isRequired,
};

export default Header;
