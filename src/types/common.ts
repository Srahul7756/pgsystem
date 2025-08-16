import {NavigationProp, NavigationState} from '@react-navigation/native';

export type Dispatch = (arg0: any) => any;
export type Navigation = NavigationProp<Record<string, object | undefined>>;
export type NavigationType = Omit<
  NavigationProp<ReactNavigation.RootParamList>,
  'getState'
> & {
  getState(): NavigationState | undefined;
};

export type ComponentType =
  | React.FC<any>
  | React.ComponentType<any>
  | (() => React.JSX.Element)
  | React.ReactNode;

export interface RouteTypes {
  name: string;
  component: ComponentType;
  headerShown: boolean;
}

export interface SimType {
  carrierName: string;
  displayName: string;
  iccId: string;
  phoneNumber: string;
  simSlotIndex: string;
  subscriptionId: string;
}
