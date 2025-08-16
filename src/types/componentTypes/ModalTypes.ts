import {Dispatch, SetStateAction} from 'react';
import {DimensionValue, StyleProp, ViewStyle} from 'react-native';
import Modal from 'react-native-modal';

export type ModalProps = React.ComponentProps<typeof Modal> & {
  testID?: string;
  isVisible?: boolean;
  setIsVisible?: Dispatch<SetStateAction<boolean>>;
  children: React.ReactNode;
  modalStyle?: StyleProp<ViewStyle>;
  isBottomSheet?: boolean;
  isPopUp?: boolean;
  isFullScreen?: boolean;
  transparent?: boolean;
  /** define in percentage */
  viewHeight?: DimensionValue;
  borderRadius?: number;
  backdropOpacity?: number;
};
