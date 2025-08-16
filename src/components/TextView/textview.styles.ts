import {AbstractedTheme} from '@theme/types/themes';
import {TextProps} from '@componentTypes/TextViewTypes';
import styled from 'styled-components/native';

const StyledText = styled.Text<TextProps>`
  font-size: ${({size}) => (typeof size === 'number' ? size + 'px' : size)};
  font-weight: ${({bold, weight, defaultFontWeight}) =>
    bold ? 'bold' : weight || defaultFontWeight};
  padding: ${({padding}) => (padding ? padding : '0px')};
  color: ${({
    color,
    validation,
    theme,
  }: {
    color?: string;
    validation?: boolean;
    theme: AbstractedTheme;
  }) =>
    validation
      ? '#a92c33'
      : color || '#151a21'};
  font-family: ${({fontFamily}) => (fontFamily ? fontFamily : 'Inter')};
  text-decoration: ${({underline}) => (underline ? 'underline' : 'none')};
`;

export {StyledText};
