import I18n from './i18n';

const missingTranslationRegex = /^\[missing ".*" translation\]$/;

// This function is a wrapper to avoid exception wich leads in a crash
const translateOrFallback = (initialMsg: any, options?: any): string => {
  // We tried to translate something else than a string
  // The native I18n function will simply crash instead of rejecting the attempt with an error message
  if (typeof initialMsg !== 'string') {
    __DEV__ &&
      // tslint:disable-next-line:no-console
      console.log(
        `I18n: you must give a string to translate instead of "${typeof initialMsg}"`
      );

    return ''; // We don't return any message as we don't know what to send
  }

  const localMsg = I18n.t(initialMsg, options);

  // The translation does not exist, the default message is not very sexy
  // Instead we return the message we tried to translate
  if (missingTranslationRegex.test(localMsg)) {
    __DEV__ &&
      // tslint:disable-next-line:no-console
      console.log(
        `translation "${initialMsg}" does not exists in translations files`
      );

    return 'Unknown';
  }

  return localMsg;
};

const setLocale = (locale: string): void => {
  I18n.locale = locale;
};

const setTranslations = (translations: any): void => {
  I18n.translations = translations;
};

const currentLocale = () => {
  return I18n.currentLocale();
};

export default {
  t: translateOrFallback,
  setLocale,
  setTranslations,
  currentLocale,
};
