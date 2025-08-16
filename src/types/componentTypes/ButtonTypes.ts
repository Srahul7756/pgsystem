import {DimensionValue, Text} from 'react-native';

export interface ButtonProps extends React.ComponentProps<typeof Text> {
  bgColor?: string;
  textColor?: string;
  fontSize?: number;
  height?: number;
  width?: DimensionValue;
  bold?: boolean;
  weight?: number | string;
  borderColor?: string;
  noBorderRadius?: boolean;
  disabled?: boolean;
  theme?: any;
  title: string;
  onPress: () => void;
  noPadding?: boolean;
  transparent?: boolean;
  color?: string;
  variant?: 'primary' | 'secondary' | 'textOnly';
  borderRadius?: number;
  leftIcon?: boolean;
  downlodIcon?: boolean;
  rightIcon?: true;
  justifyContent?:
    | 'flex-start'
    | 'flex-end'
    | 'center'
    | 'space-between'
    | 'space-around'
    | 'space-evenly'
    | undefined;
  noUnderline?: boolean;
  paddingHorizontal?: number;
}
