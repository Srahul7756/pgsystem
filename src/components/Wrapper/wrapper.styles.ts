import {DeviceHeight} from '../../utils/common';
import {StyleSheet, View} from 'react-native';
import styled from 'styled-components/native';
import {WrapperProps} from '../../types/componentTypes/WrapperTypes';
import {AbstractedTheme} from '../../theme/types/themes';

const wrapperStyles = StyleSheet.create({
  blurViewStyles: {
    height: DeviceHeight,
    width: '100%',
    position: 'absolute',
    zIndex: 2,
  },
  footer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 6,
    width: '100%',
  },
});

const StyledWrapper = styled(View)<WrapperProps>`
  flex: 1;
  padding: ${({noPadding, padding}) =>
    noPadding ? '0px' : padding !== undefined ? `${padding}px` : '12px'};
  background-color: ${({
    theme,
    bgColor,
  }: {
    theme: AbstractedTheme;
    bgColor?: string;
  }) => {
    return bgColor || '#F3EDEA';
  }};
  flex-direction: column;
  width: 100%;
  border-top-left-radius: ${({borderTopLeftRadius}) =>
    borderTopLeftRadius ? `${borderTopLeftRadius}px` : '0px'};
  border-top-right-radius: ${({borderTopRightRadius}) =>
    borderTopRightRadius ? `${borderTopRightRadius}px` : '0px'};
  border-bottom-left-radius: ${({borderBottomLeftRadius}) =>
    borderBottomLeftRadius ? `${borderBottomLeftRadius}px` : '0px'};
  border-bottom-right-radius: ${({borderBottomRightRadius}) =>
    borderBottomRightRadius ? `${borderBottomRightRadius}px` : '0px'};
`;

export {wrapperStyles, StyledWrapper};
