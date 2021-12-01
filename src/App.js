import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { IntlProvider } from 'react-intl';

import './App.css';
import Header from './components/layout/Header';
import translations from './i18n/translations';
import { ENGLISH } from './i18n/locales';
import { setLocale } from './store/common/slice';

const App = () => {
  const dispatch = useDispatch();
  const { locale } = useSelector((state) => state.common);

  const handleChange = ({ target: { value } }) => {
    dispatch(setLocale(value));
  };

  return (
    <IntlProvider
      messages={translations[locale]}
      locale={locale}
      defaultLocale={ENGLISH}
    >
      <div className="App">
        <Header currentLocale={locale} handleChange={handleChange} />
      </div>
    </IntlProvider>
  );
};

export default App;
