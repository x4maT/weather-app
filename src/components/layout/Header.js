import React, { useState, useRef, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';

import { setLocale } from '../../store/common/slice';
import { UKRAINE, ENGLISH } from '../../i18n/locales';
import logo from '../../assets/logo.svg';
import uaFlag from '../../assets/flags/ua.png';
import usFlag from '../../assets/flags/us.png';

const Header = ({ currentLocale }) => {
  const [openLanguageMenu, setLanguageMenuOpen] = useState(false);
  const container = useRef(null);
  const dispatch = useDispatch();

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (!container.current.contains(event.target)) {
        if (!openLanguageMenu) return;
        setLanguageMenuOpen(false);
      }
    };

    window.addEventListener('click', handleOutsideClick);
    return () => window.removeEventListener('click', handleOutsideClick);
  }, [openLanguageMenu, container]);

  const languages = [
    { name: 'English', code: ENGLISH, flag: usFlag },
    { name: 'Ukraine', code: UKRAINE, flag: uaFlag },
  ];

  const handleLanguageChanges = ({ currentTarget: { value } }) => {
    dispatch(setLocale(value));
    setLanguageMenuOpen(false);
  };

  const currentFlag = () =>
    languages.find((language) => language.code === currentLocale).flag;

  return (
    <header>
      <nav className="bg-gray-800 shadow-lg">
        <div className="py-2 mx-5">
          <div className="flex justify-between items-center">
            <div className="flex space-x-7">
              <div className="flex items-center">
                {/* Logo and Title */}
                <img src={logo} alt="Logo" className="h-8 w-8 mr-2" />
                <span className="font-semibold text-white text-lg">
                  <FormattedMessage id="projectTitle" />
                </span>
              </div>
            </div>
            <div ref={container} className="relative">
              <div>
                <button
                  type="button"
                  className="bg-gray-800 flex text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
                  id="language-menu-button"
                  onClick={() => setLanguageMenuOpen(!openLanguageMenu)}
                >
                  <span className="sr-only">Open language menu</span>
                  <img
                    className="h-6 w-6 rounded-full"
                    src={currentFlag()}
                    alt=""
                  />
                </button>
              </div>
              {openLanguageMenu && (
                <div
                  className="origin-top-right absolute right-1 mt-3 w-48 rounded-md shadow-lg py-1"
                  role="menu"
                  aria-orientation="vertical"
                  aria-labelledby="language-menu-button"
                  tabIndex="-1"
                >
                  {languages.map(({ name, code, flag }) => (
                    <div className="flex justify-around items-center">
                      <button
                        type="button"
                        className="flex text-gray-300 hover:bg-gray-300 hover:text-white block px-3 py-2 rounded-sm text-base font-medium"
                        key={code}
                        value={code}
                        onClick={handleLanguageChanges}
                      >
                        <span className="flex text-sm mx-5 text-gray-500">
                          {name}
                        </span>
                        <img
                          src={flag}
                          className="h-5 w-5 rounded-full"
                          alt={name}
                        />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
};

Header.propTypes = {
  currentLocale: PropTypes.string.isRequired,
};

export default Header;
