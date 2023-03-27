import { default as appTheme } from './app-theme.json';

interface ThemeRegistry {
  ['App Theme']: any;
}

export const themes: ThemeRegistry = {
  'App Theme': appTheme,
};
