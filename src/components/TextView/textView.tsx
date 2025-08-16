import React from 'react';
import {useTheme} from '../../theme';
import {TextProps} from '../../types/componentTypes/TextViewTypes';
import {StyledText} from './textview.styles';
import {getInterFontByWeight} from '../../utils/common';

export const TextView: React.FC<TextProps> = ({
  title,
  bold,
  size,
  weight = 400,
  padding,
  color,
  underline,
  centerText,
  validation,
  fontFamily,
  maxTextLength,
  ...props
}) => {
  // const {t} = useTranslation();
  const {theme, font} = useTheme();

  return (
    <StyledText
      {...props}
      validation={validation}
      fontFamily={getInterFontByWeight(`${weight}`)}
      bold={bold}
      weight={weight}
      size={size}
      padding={padding}
      color={color}
      centerText={centerText}
      underline={underline}>
      {maxTextLength
        ? title.length < maxTextLength
          ? title
          : title?.slice(0, maxTextLength) + '...'
        : title}
    </StyledText>
  );
};
