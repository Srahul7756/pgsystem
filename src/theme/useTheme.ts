import {useContext} from 'react';
import {ThemeContext} from './ThemeContext';
import {Theme, Font} from './types/themes';

export interface ThemeAccess {
  /** The active theme. */
  theme: Theme;
  font: Font;
  /** Change the active theme. */
  setTheme: (newTheme: Theme) => void;
  setActiveFont: (newFont: Font) => void;
}

/** Provide runtime access to the themes. */
export function useTheme(): ThemeAccess {
  const {theme, font, setTheme, setActiveFont} = useContext(ThemeContext);
  return {theme, font, setTheme, setActiveFont};
}
