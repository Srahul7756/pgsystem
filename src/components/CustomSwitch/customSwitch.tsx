import {useTheme} from '@theme/useTheme';
import React from 'react';
import {
  Animated,
  TouchableWithoutFeedback,
  StyleSheet,
  ViewStyle,
  View,
} from 'react-native';
import {CustomSwitchStyles} from './customSwitch.styles';
import {CustomSwitchProps} from '@types/componentTypes/CustomSwitchTypes';

export const CustomSwitch: React.FC<CustomSwitchProps> = ({
  value,
  onValueChange,
  disabled = false,
  style,
  width = 34,
  height = 19,
}) => {
  const thumbAnim = React.useRef(new Animated.Value(value ? 1 : 0)).current;
  const {theme, font} = useTheme();

  const handleToggle = () => {
    if (disabled) return;

    Animated.spring(thumbAnim, {
      toValue: value ? 0 : 1,
      useNativeDriver: true,
      bounciness: 0,
    }).start();

    onValueChange(!value);
  };

  const thumbPosition = thumbAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [2, width - height + 2],
  });

  const switchStyles = {
    backgroundColor: value
      ? theme.colors.primary.normal
      : theme.colors.primary.light,
    opacity: disabled ? 0.5 : 1,
  };

  return (
    <TouchableWithoutFeedback onPress={handleToggle} disabled={disabled}>
      <View
        style={[
          CustomSwitchStyles.container,
          switchStyles,
          style,
          {width, height, borderRadius: height / 2},
        ]}>
        <Animated.View
          style={[
            CustomSwitchStyles.thumb,
            {
              width: height - 4,
              height: height - 4,
              borderRadius: (height - 4) / 2,
              backgroundColor: theme.colors.white,
              transform: [{translateX: thumbPosition}],
            },
          ]}
        />
      </View>
    </TouchableWithoutFeedback>
  );
};
