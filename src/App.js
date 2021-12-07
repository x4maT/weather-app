import React, { useEffect } from 'react';
import { useSelector, useDispatch, shallowEqual } from 'react-redux';
import { IntlProvider } from 'react-intl';

import './App.css';
import Header from './components/layout/Header';
import Main from './components/layout/Main';
import Footer from './components/layout/Footer';
import { ErrorPortal } from './components/layout/ErrorPortal';
import translations from './i18n/translations';
import { ENGLISH } from './i18n/locales';
import { getByGeoLocation } from './store/weather/actions';
import { setError, removeError } from './store/common/slice';
import { normalizeLocale } from './utils/locales';

const getCurrentGeoLocation = (successCallback, errorCallback) =>
  navigator.geolocation &&
  navigator.geolocation.getCurrentPosition(successCallback, errorCallback);

const App = () => {
  const dispatch = useDispatch();
  const { locale } = useSelector(({ common }) => common, shallowEqual);
  const { currentLocationId } = useSelector(
    ({ weather }) => weather,
    shallowEqual,
  );

  const successGeoLocationRequest = (pos) => {
    const { latitude: lat, longitude: lon } = pos.coords;

    dispatch(
      getByGeoLocation({
        current: true,
        lat,
        lon,
        lang: normalizeLocale(locale),
      }),
    );
  };

  const failGeoLocationRequest = (err) => {
    dispatch(setError(err));
  };

  useEffect(() => {
    dispatch(removeError());
  }, []);

  useEffect(() => {
    if (!currentLocationId) {
      getCurrentGeoLocation(successGeoLocationRequest, failGeoLocationRequest);
    }
  }, [currentLocationId]);

  return (
    <IntlProvider
      messages={translations[locale]}
      locale={locale}
      defaultLocale={ENGLISH}
    >
      <div className="App flex flex-col h-screen">
        <Header currentLocale={locale} />
        <Main />
        <Footer />
        <ErrorPortal />
      </div>
    </IntlProvider>
  );
};

export default App;
