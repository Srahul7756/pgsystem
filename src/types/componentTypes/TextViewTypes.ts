import {Text} from 'react-native';

export type TextProps = React.ComponentProps<typeof Text> & {
  title?: string;
  bold?: boolean;
  size: number;
  weight?: string | number;
  padding?: string;
  color?: string | any;
  underline?: boolean;
  opacity?: number;
  centerText?: boolean;
  defaultFontSize?: any;
  defaultFontWeight?: any;
  numberOfLines?: number;
  validation?: boolean;
  fontFamily?: string;
  maxTextLength?: number;
};
