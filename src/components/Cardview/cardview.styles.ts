import {CardviewProps} from '@componentTypes/CardviewTypes';
import {AbstractedTheme} from '@theme/types/themes';
import styled from 'styled-components/native';

const StyledView = styled.View`
  background-color: ${({theme}: {theme: AbstractedTheme}) =>
    theme.jsb.colors.white};
  padding: ${({padding, noPadding}) =>
    noPadding ? '0px' : padding ? padding + 'px' : '16px'};
  border-radius: 8px;
  border-width: 1px;
  border-color: ${({theme}: {theme: AbstractedTheme}) =>
    theme.jsb.colors.neutral.light};
  border-style: solid;
`;

const StyledCard = styled.TouchableOpacity<CardviewProps>`
  height: ${({height}) =>
    typeof height === 'number' || height?.includes('%')
      ? height
      : height !== undefined
      ? height + 'px'
      : 'auto'};
  width: ${({width}) =>
    typeof width === 'number' || width?.includes('%')
      ? width
      : width !== undefined
      ? width + 'px'
      : 'auto'};
  border-radius: 8px;
`;
export {StyledView, StyledCard};
