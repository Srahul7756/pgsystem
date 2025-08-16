import {ViewStyle} from 'react-native';

export interface CustomSwitchProps {
  value: boolean;
  onValueChange: (value: boolean) => void;
  disabled?: boolean;
  style?: ViewStyle;
  width?: number;
  height?: number;
}
