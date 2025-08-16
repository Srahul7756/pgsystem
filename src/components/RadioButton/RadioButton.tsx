import {useTheme} from '@theme/index';
import React from 'react';
import {
  StyleProp,
  ViewStyle,
  StyleSheet,
  Pressable,
  FlexAlignType,
  TouchableOpacity,
} from 'react-native';

type DataType = {
  children?: React.ReactNode;
  selectedOption?: any;
  setSelectedOption?: any;
  currentOption?: any;
  alignItems?: FlexAlignType;
  inverse?: boolean;
  onChange?: (option: any) => void;
  rootContainerOverrideStyles?: ViewStyle;
};

const RadioButton: React.FC<DataType> = props => {
  const {
    children,
    selectedOption,
    setSelectedOption,
    currentOption,
    alignItems,
    inverse,
    onChange,
    rootContainerOverrideStyles,
  } = props;
  const {theme, font} = useTheme();

  const selectedOptionStyle: StyleProp<ViewStyle> = {
    height: 22,
    width: 22,
    borderRadius: 15,
    borderColor: theme.colors.primary.normal,
    borderWidth: 6,
  };

  const deselectedOptionStyle: StyleProp<ViewStyle> = {
    height: 22,
    width: 22,
    borderRadius: 15,
    borderColor: theme.colors.neutral.lightActive,
    borderWidth: 2,
  };

  const handlePress = () => {
    if (onChange) {
      onChange(currentOption);
    }
    // setSelectedOption(currentOption);
  };

  return (
    <TouchableOpacity
      onPress={() => {
        handlePress();
      }}
      style={{
        ...(rootContainerOverrideStyles
          ? rootContainerOverrideStyles
          : styles.rootContainer),
        alignItems: alignItems,
      }}>
      {!inverse && (
        <Pressable
          style={
            selectedOption == currentOption
              ? selectedOptionStyle
              : deselectedOptionStyle
          }></Pressable>
      )}
      {children}
      {inverse && (
        <Pressable
          style={
            selectedOption == currentOption
              ? selectedOptionStyle
              : deselectedOptionStyle
          }></Pressable>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  rootContainer: {
    display: 'flex',
    flexDirection: 'row',
    width: '100%',
    columnGap: 8,
  },
});

export {RadioButton};
