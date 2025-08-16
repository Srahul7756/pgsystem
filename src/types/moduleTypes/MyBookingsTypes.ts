import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RouteProp} from '@react-navigation/native';

export type ParamList = {
  MY_BOOKINGS: {initialActiveTabIndex: number};
};

type MyBookingsNavigationProp = NativeStackNavigationProp<
  ParamList,
  'MY_BOOKINGS'
>;
type MyBookingsRouteProp = RouteProp<ParamList, 'MY_BOOKINGS'>;

export type MyBookingsProps = {
  navigation: MyBookingsNavigationProp;
  route: MyBookingsRouteProp;
};

interface Logo {
  type: 'image';
  url: string;
}

interface RawDataItem {
  key: string;
  value: string;
}

export interface PujaItem {
  logo: Logo;
  title: string;
  participant_count: string;
  package: string;
  type: string;
  date: string;
  temple_name: string;
  temple_city: string;
  temple_state: string;
  starts_in: string;
  status: 'SUCCESS' | 'FAILED' | string;
  raw_data: RawDataItem[];
}

export interface Props {
  theme: any;
  font: any;
  data: PujaItem;
  details?: boolean;
}
