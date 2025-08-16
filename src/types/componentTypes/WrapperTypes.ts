import {StyleProp, ViewStyle} from 'react-native';

export interface WrapperProps {
  bgColor?: string;
  borderTopLeftRadius?: number;
  borderTopRightRadius?: number;
  borderBottomLeftRadius?: number;
  borderBottomRightRadius?: number;
  noPadding?: boolean;
  children?: any;
  style?: StyleProp<ViewStyle>;
  noShadow?: boolean;
  header?: React.ReactNode;
  noScroll?: boolean;
  nestedScrollEnabled?: boolean;
  isModalVisible?: boolean;
  statusBarColor?: string;
  padding?: number;
  barStyle?: 'default' | 'light-content' | 'dark-content';
  isUPIPay?: boolean;
  translucent?: boolean;
  noLoader?: boolean;
}
