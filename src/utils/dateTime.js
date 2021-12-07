import {
  fromUnixTime,
  formatDistanceToNow,
  addMilliseconds,
  isAfter,
  format,
} from 'date-fns';
import { uk, enUS } from 'date-fns/locale';

const localeList = {
  en: enUS,
  uk,
};

export const today = (locale) =>
  format(new Date(), 'do, MMM, yyyy', {
    locale: localeList[locale],
  });

export const timeDistanceToNow = (timestamp, locale) =>
  formatDistanceToNow(fromUnixTime(timestamp), {
    addSuffix: true,
    locale: localeList[locale],
  });

export const isExpired = (updatedAt) => {
  const expiredDate = addMilliseconds(
    fromUnixTime(updatedAt),
    +process.env.REACT_APP_DATA_EXPIRE_TIME,
  );

  return isAfter(new Date(), expiredDate);
};

export const localeDate = (date, formatString, locale) =>
  format(fromUnixTime(date), formatString, {
    locale: localeList[locale],
  });
