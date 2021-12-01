import React from 'react';
import { useSelector } from 'react-redux';
import { IntlProvider } from 'react-intl';

import './App.css';
import Header from './components/layout/Header';
import translations from './i18n/translations';
import { ENGLISH } from './i18n/locales';

const App = () => {
  const { locale } = useSelector((state) => state.common);

  return (
    <IntlProvider
      messages={translations[locale]}
      locale={locale}
      defaultLocale={ENGLISH}
    >
      <div className="App">
        <Header currentLocale={locale} />
      </div>
    </IntlProvider>
  );
};

export default App;
