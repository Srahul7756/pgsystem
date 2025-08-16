import {Theme} from '@theme/types/themes';
import {ColorValue, TextInputProps, TextStyle, ViewStyle} from 'react-native';
import Animated from 'react-native-reanimated';

export interface AnimatedInputProps extends TextInputProps {
  /**
   * The color of the background behind the text-input.
   *
   * The placeholder text is wrapped in a background of this colour, which is responsible for creating the effect of seemingly 'making room'
   * in the upper-left of the text-box for said placeholder text, when the text-input is focused.
   */
  backgroundColor?: ColorValue;
  searchIcon?: boolean;
  /**
   * The color of the border of the text-input
   */
  borderColor?: ColorValue;

  /**
   * The color of the delete icon
   */
  deleteIconColor?: ColorValue;

  /**
   *
   */
  placeholderTextStyle?: TextStyle;

  /**
   *
   */
  containerStyle?: ViewStyle;

  /**
   *
   */
  isIcon?: boolean;

  /**
   *
   */
  icon?: React.ReactNode;

  rightIcon?: () => React.JSX.Element;

  type?: 'number' | 'decimal' | 'alphanumeric' | 'debitCardNoExpiry';

  hint?: string;

  handlePressRight?: () => void;
  setShow?: boolean;
  validationError?: string;

  noBorder?: boolean;
  fontSize?: number;
  fontWeight?: TextStyle['fontWeight'];
  height?: number;

  formattedNumber?: boolean;
  formattedAmount?: boolean;
  onCustomValueChange?: ({
    raw,
    formatted,
  }: {
    raw: string;
    formatted: string;
  }) => void;
  searchIconColor?: string;
  color?: string;
}

export interface DeleteButtonProps
  extends Pick<AnimatedInputProps, 'deleteIconColor'> {
  deleteButtonAnimationProgress: Animated.SharedValue<number>;
  handlePressDelete: () => void;
}

export interface ShowTextProps
  extends Pick<AnimatedInputProps, 'deleteIconColor'> {
  deleteButtonAnimationProgress: Animated.SharedValue<number>;
  textColor: string;
  onShow: () => void;
  showPass: boolean;
  theme: Theme;
}

export interface PlaceholderProps
  extends Pick<TextInputProps, 'placeholder' | 'placeholderTextColor'>,
    Pick<AnimatedInputProps, 'backgroundColor' | 'placeholderTextStyle'> {
  placeholderAnimationProgress: Animated.SharedValue<number>;
  searchIcon: boolean;
  isIcon?: boolean;
  multiline?: boolean;
}

export interface RightButtonProps
  extends Pick<AnimatedInputProps, 'deleteIconColor'> {
  rightIcon: React.ReactNode;
  handlePressRight: () => void;
}
