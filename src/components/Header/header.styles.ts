import {AbstractedTheme} from '@theme/types/themes';
import {TouchableOpacity, View} from 'react-native';
import styled from 'styled-components/native';

const HeaderContainer = styled(View)<{
  themeMode: string;
  transparent?: boolean;
  bgColor?: string;
}>`
  flex-direction: row;
  background-color: ${({
    theme,
    bgColor,
  }: {
    theme: AbstractedTheme;
    bgColor?: string;
  }) => bgColor || 'white'};
  align-items: center;
`;

const HeaderView = styled(View)<{rightIcon?: any}>`
  flex: 1;
  margin-right: ${({rightIcon}) => (rightIcon ? 15 : 0)};
  justify-content: space-between;
  flex-direction: row;
  align-items: center;
`;

const LeftArrow = styled(TouchableOpacity)`
  margin-right: 10px;
`;

export {HeaderContainer, HeaderView, LeftArrow};
