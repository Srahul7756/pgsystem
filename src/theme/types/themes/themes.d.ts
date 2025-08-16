import {ThemeMode} from '../../../src/store/types';
import {TextStyle} from 'react-native';

export interface Theme {
  colors: ColorMap;
  paddingConfig: PaddingMap;
  themeMode: ThemeMode;
}

export interface Font {
  fontConfig: FontMap;
}
export interface AbstractedTheme extends Theme {
  jsb: Theme;
}

export interface AbstractedFont extends Font {
  jsb: Font;
}

export interface SubColorMap {
  light: string;
  lightHover: string;
  lightActive: string;
  normal: string;
  normalHover: string;
  normalActive: string;
  dark: string;
  darkHover: string;
  darkActive: string;
  darker: string;
  splashbackground?: string;
}

export interface ColorMap {
  primary: SubColorMap;
  secondary: SubColorMap;
  blue: SubColorMap;
  neutral: SubColorMap;
  white: string;
  failureRed: string;
  green: string;
  red: string;
  bgColor: string;
  hintofGreen: string;
  light40: string;
  darkGreen: string;
  nonBankerGradient: Array<string>;
  light50: string;
  lightGreen: string;
  lightFailure: string;
  separatorColor: string;
  blueLight50: string;
  lightRed: string;
  blueBg: string;
  alto: string;
  jungleGreen: string;
  nonBankerTransactionGradient: Array<string>;
  black: string;
  greenProgress: string;
  saffron: string;
  cyclops: string;
  darkBlack: string;
  dark90: string;
  gray: string;
  splashbackground: string;
  textInputBorderColor: string;
  buttonBGColor: string;
  textColor: string;
  screenBGColr: string;
  textInputPlaceHolderColor: string;
  pageDots?: string;
  pageDotsDefault?: string;
  bottomTextColor?: string;
  numberofViewTextColor?: string;
  primary8?: string;
  snow: string;
  lightGreen: string;
  lightFreen: string;
  primary12: string;
  dark60: string;
  whatsAppGreen: string;
}

export interface FontMap {
  fontSizes: Record<string, TextStyle['fontSize']>;
  fontWeights: {
    regular: TextStyle['fontWeight'];
    medium: TextStyle['fontWeight'];
    xMedium: TextStyle['fontWeight'];
    bold: TextStyle['fontWeight'];
  };
}

export interface PaddingMap {
  paddingHorizontal: {
    pagePadding: string;
  };
}
