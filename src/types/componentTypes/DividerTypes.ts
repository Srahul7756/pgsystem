import {StyleProp, ViewStyle} from 'react-native';

export interface DividerProps {
  axis?: 'horizontal' | 'vertical';
  dashGap?: number;
  dashLength?: number;
  dashThickness?: number;
  dashColor?: string;
  dashStyle?: StyleProp<ViewStyle>;
  style?: StyleProp<ViewStyle>;
}
