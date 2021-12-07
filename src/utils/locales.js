// openweathermap.org double named locales
// https://openweathermap.org/api/one-call-api#multi

const doubleNamedLocales = {
  pt_br: 'pt_br',
  zh_cn: 'zh_cn',
  zh_tw: 'zh_tw',
};

export const normalizeLocale = (value) => {
  const locale = value.toLowerCase().replace(/-/g, '_');

  return doubleNamedLocales[locale] ? locale : locale.split('_')[0];
};

export function flattenMessages(nestedMessages, prefix = '') {
  return Object.keys(nestedMessages).reduce((messages, key) => {
    const value = nestedMessages[key];
    const prefixedKey = prefix ? `${prefix}.${key}` : key;

    if (typeof value === 'string') {
      messages[prefixedKey] = value;
    } else {
      Object.assign(messages, flattenMessages(value, prefixedKey));
    }

    return messages;
  }, {});
}
