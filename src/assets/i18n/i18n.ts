import I18n from 'react-native-i18n';
import en from './dynamic-languages/en';
// import vi from './languages/vi';
// import fr from './languages/fr';
// import es from './languages/es';
// import id from './languages/id';
// import pt from './languages/pt';

// Enable fallbacks if you want `en-US` and `en-GB` to fallback to `en`
I18n.fallbacks = true;

// If we do not want the framework to use the phone"s locale by default
I18n.locale = 'en';

// English language is the main language for fall back:
I18n.translations = {
  en,
  // vi,
  // fr,
  // es,
  // id,
};

export default I18n;
