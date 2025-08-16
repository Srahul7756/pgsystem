/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {Dropdown as Picker} from 'react-native-element-dropdown';
import {Platform, StyleProp, StyleSheet, Text, View} from 'react-native';
import {useTheme} from '../../theme';
import {styled} from 'styled-components';

export type DropDownTyped = React.ComponentProps<typeof Picker> & {
  width?: number;
  height?: number;
  label?: string;
  paddingLeft?: number;
  bgColor?: string;
  isFocus?: boolean;
};

export const Dropdown: React.FC<DropDownTyped> = props => {
  const {label} = props;
  const {theme, font} = useTheme();

  const lightThemeTextStyle: StyleProp<any> = {
    paddingLeft: 4,
    paddingRight: 4,
    fontSize: font.fontConfig.fontSizes.font11,
    fontWeight: font.fontConfig.fontWeights.regular,
    color: theme.colors.black,
    marginBottom: -9,
    alignSelf: 'flex-start',
    zIndex: 2,
    backgroundColor: 'white',
  };

  const TextAreaWrapper = styled(View)<{
    themeMode?: string;
    borderRadius?: string | number;
  }>`
    z-index: 1;
    position: ${'absolute'};
    top: -6px;
    background-color: ${theme.colors.white};
    margin-left: 10px;
  `;

  return (
    <>
      <View style={{marginBottom: 7}}>
        {label && (
          <TextAreaWrapper>
            <Text style={lightThemeTextStyle}>{label}</Text>
          </TextAreaWrapper>
        )}
        <View>
          <Picker
            {...props}
            style={[
              styles.dropdown,
              props.isFocus && {borderColor: theme.colors.neutral.normal},
            ]}
            placeholderStyle={{
              ...styles.placeholderStyle,
              color: theme.colors.neutral.normal,
              fontWeight: font.fontConfig.fontWeights.xMedium,
            }}
            selectedTextStyle={{
              ...styles.selectedTextStyle,
              color: theme.colors.neutral.normal,
              fontWeight: font.fontConfig.fontWeights.xMedium,
            }}
            inputSearchStyle={styles.inputSearchStyle}
            iconStyle={styles.iconStyle}
          />
        </View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    padding: 16,
  },
  dropdown: {
    height: 50,
    borderColor: 'black',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 8,
  },
  icon: {
    marginRight: 5,
  },
  label: {
    position: 'absolute',
    backgroundColor: 'white',
    left: 22,
    top: 8,
    zIndex: 999,
    paddingHorizontal: 8,
    fontSize: 14,
  },
  placeholderStyle: {
    fontSize: 14,
  },
  selectedTextStyle: {
    fontSize: 14,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },
});
