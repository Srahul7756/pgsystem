import React from 'react';
import {Pressable, Text, TouchableOpacity} from 'react-native';
import {ButtonProps} from '../../types/componentTypes/ButtonTypes';
import {useTheme} from '../../theme/useTheme';
import {useSelector} from 'react-redux';
import {RootState} from '../../store/index';
import Feather from 'react-native-vector-icons/Feather';
import {TextView} from '../../components/TextView';
import {buttonStyles} from './button.styles';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

export const Button: React.FC<ButtonProps> = props => {
  const {
    title,
    disabled,
    height,
    width,
    onPress,
    fontSize,
    weight,
    bgColor,
    textColor,
    bold,
    noBorderRadius,
    borderColor,
    variant,
    borderRadius,
    leftIcon,
    downlodIcon,
    justifyContent,
    noUnderline,
    rightIcon,
    paddingHorizontal,
    customRightIcon,
  } = props;
  const {theme, font} = useTheme();
  const {themeMode} = useSelector((state: RootState) => state.themeMode);
  // const {t} = useTranslation();

  const PrimaryVariant = () => (
    <TouchableOpacity
      style={[
        buttonStyles.commonStyles,
        {
          justifyContent: justifyContent || 'center',
          width: width || '100%',
          height: height || 44,
          borderRadius: noBorderRadius ? 0 : borderRadius ? borderRadius : 8,
          backgroundColor: disabled
            ? theme.colors.neutral.lightActive
            : bgColor || theme.colors.primary.dark,
          borderColor: borderColor,
          borderWidth: borderColor ? 1 : 0,
          paddingHorizontal: paddingHorizontal ? paddingHorizontal : 0,
        },
      ]}
      onPress={onPress}
      disabled={disabled}>
      {/* {downlodIcon && <DownloadIcon />} */}
      {leftIcon && (
        <Feather
          name="share-2"
          color={theme.colors.white}
          size={font.fontConfig.fontSizes.font23}
        />
      )}
      <TextView
        title={title}
        size={fontSize || font.fontConfig.fontSizes.font14}
        color={textColor || theme.colors.white}
        weight={weight || font.fontConfig.fontWeights.xMedium}
      />
      {rightIcon && (
        <FontAwesome
          name="angle-double-right"
          color={theme.colors.white}
          size={font.fontConfig.fontSizes.font24}
        />
      )}
    </TouchableOpacity>
  );

  const getVariant = (variant: string) => {
    if (variant === 'primary') {
      return <PrimaryVariant />;
    } else if (variant === 'textOnly') {
      return (
        <Pressable
          style={[
            buttonStyles.commonStyles,
            {
              justifyContent: justifyContent || 'center',
              width: width || '100%',
            },
          ]}
          onPress={onPress}
          disabled={disabled}>
          {leftIcon && (
            <Feather
              name="share-2"
              color={theme.colors.neutral.normal}
              size={font.fontConfig.fontSizes.font23}
            />
          )}
          <TextView
            title={title}
            size={fontSize || font.fontConfig.fontSizes.font14}
            color={textColor || theme.colors.neutral.normal}
            weight={weight || font.fontConfig.fontWeights.regular}
            underline={noUnderline ? false : true}
          />
          {rightIcon && (
            <FontAwesome
              name="angle-double-right"
              color={theme.colors.white}
              size={font.fontConfig.fontSizes.font24}
            />
          )}
        </Pressable>
      );
    } else if (variant === 'secondary') {
      return (
        <Pressable
          style={[
            buttonStyles.commonStyles,
            {
              justifyContent: justifyContent || 'center',
              width: width || '100%',
              height: height || 44,
              borderWidth: 1,
              borderColor: borderColor
                ? borderColor
                : theme.colors.primary.dark,
              borderRadius: noBorderRadius
                ? 0
                : borderRadius
                ? borderRadius
                : 8,
              paddingHorizontal: 12,
              backgroundColor: bgColor ? bgColor : theme.colors.white,
            },
          ]}
          onPress={onPress}
          disabled={disabled}>
          {leftIcon && (
            <Feather
              name="share-2"
              color={theme.colors.primary.normal}
              size={font.fontConfig.fontSizes.font23}
            />
          )}
          <TextView
            title={title}
            size={fontSize || font.fontConfig.fontSizes.font16}
            color={textColor || theme.colors.primary.dark}
            weight={weight || font.fontConfig.fontWeights.xMedium}
            bold={bold}
          />
          {rightIcon && (
            <FontAwesome
              name="angle-double-right"
              color={theme.colors.white}
              size={font.fontConfig.fontSizes.font24}
            />
          )}
        </Pressable>
      );
    } else {
      return <PrimaryVariant />;
    }
  };

  return <>{getVariant(variant)}</>;
};
