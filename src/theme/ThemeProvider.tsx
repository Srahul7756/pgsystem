/* eslint-disable react-hooks/exhaustive-deps */
import React, {ReactNode, useLayoutEffect, useState} from 'react';
import {Theme, Font} from './types/themes';
import {Dark, Light, defaultFont, largeFont, mediumFont} from './themes';
import {ThemeContext} from './ThemeContext';
import {StyledThemeProvider} from './StyledThemeProvider';
import {generateTheme} from './utils';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '../src/store';

export interface ThemeProviderProps {
  /** The initial theme used in the app. */
  theme?: Theme;
  font?: Font;
  children: ReactNode;
}

export const ThemeProvider: React.FC<ThemeProviderProps> = props => {
  const {theme: initialTheme, font: initialFont, children} = props;
  const {themeMode} = useSelector((state: RootState) => state.themeMode);
  const {font} = useSelector((state: RootState) => state.fontConfig);

  const [activeTheme, setActiveTheme] = useState<Theme>(initialTheme || Light);
  const [activeFont, setActiveFont] = useState<Font>(
    initialFont || defaultFont,
  );
  const styledTheme = generateTheme(activeTheme);
  const dispatch = useDispatch();

  useLayoutEffect(() => {
    setActiveFont(
      font === 'medium'
        ? mediumFont
        : font === 'large'
        ? largeFont
        : defaultFont,
    );
  }, [font]);

  useLayoutEffect(() => {
    switch (themeMode) {
      case 'light':
        setActiveTheme(Light);
        break;
      case 'dark':
        setActiveTheme(Dark);
        break;
    }
  }, [themeMode]);

  return (
    <StyledThemeProvider theme={styledTheme}>
      <ThemeContext.Provider
        value={{
          theme: activeTheme,
          font: activeFont,
          setActiveFont: setActiveFont,
          setTheme: setActiveTheme,
        }}>
        {children}
      </ThemeContext.Provider>
    </StyledThemeProvider>
  );
};
