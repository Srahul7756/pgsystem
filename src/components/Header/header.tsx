import React from 'react';
import {HeaderContainer, HeaderView, LeftArrow} from './header.styles';
import {HeaderProps} from '../../types/componentTypes/HeaderTypes';
import {useNavigation} from '@react-navigation/native';
import {useTheme} from '../../theme/useTheme';
import {useSelector} from 'react-redux';
import {RootState} from '../../store/index';
import Feather from 'react-native-vector-icons/Feather';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {Col, TextView} from '../../components/index';
import {Image, View} from 'react-native';
// import {JanataBanner} from '@assets/common';

export const Header: React.FC<HeaderProps> = props => {
  const {
    title,
    withBack,
    children,
    icon,
    leftIcon,
    withClose,
    titleWidth,
    color,
    transparent,
    subtitle,
    bgColor,
    textColor,
    rightIcon,
    textSize,
    customSubTitle,
    height,
    highlighedHeader,
    customOnBack,
  } = props;
  const navigation = useNavigation();
  const {theme, font} = useTheme();
  const Icon = icon;
  const LeftIcon = leftIcon;
  const RightIcon = rightIcon;
  const {themeMode} = useSelector((state: RootState) => state.themeMode);

  return (
    <>
        <HeaderContainer
          themeMode={themeMode}
          style={{
            height: height || 56,
            zIndex: 2,
            paddingHorizontal: 16,
          }}
          bgColor={bgColor}>
          {leftIcon && <LeftIcon />}
          {withBack && (
            <LeftArrow
              onPress={() =>
                customOnBack ? customOnBack() : navigation.goBack()
              }>
              <Feather
                name="chevron-left"
                color={textColor || theme.colors.neutral.normal}
                size={24}
              />
            </LeftArrow>
          )}
          {withClose && (
            <LeftArrow onPress={() => navigation.goBack()}>
              <MaterialCommunityIcons
                name="close"
                color={textColor || theme.colors.neutral.normal}
                size={24}
              />
            </LeftArrow>
          )}
          {title ? (
            <HeaderView rightIcon={rightIcon}>
              <Col style={{flex: 1, width: '100%', flexWrap: 'wrap'}}>
                <TextView
                  numberOfLines={1}
                  title={title}
                  size={textSize || font.fontConfig.fontSizes.font18}
                  color={textColor || theme.colors.neutral.normal}
                  weight={font.fontConfig.fontWeights.xMedium}
                  style={{
                    letterSpacing: 0.18,
                    width: '95%',
                  }}
                />
                {/* {subtitle ? (
                <TextView
                  numberOfLines={1}
                  title={subtitle}
                  size={font.fontConfig.fontSizes.font12}
                  color={textColor || theme.colors.gray600}
                  weight={font.fontConfig.fontWeights.regular}
                />
              ) : (
                <>{customSubTitle || <></>}</>
              )} */}
              </Col>
              {icon && <Icon />}
            </HeaderView>
          ) : (
            children
          )}
          {rightIcon && <RightIcon />}
        </HeaderContainer>
   
    </>
  );
};
