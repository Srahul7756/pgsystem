import {TouchableOpacity} from 'react-native';

export interface CardviewProps
  extends React.ComponentProps<typeof TouchableOpacity> {
  children: React.ReactNode;
  height?: number | string;
  width?: number | string;
  padding?: string | number;
  noPadding?: boolean;
}
