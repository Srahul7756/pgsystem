import React, {useCallback, useEffect, useState, memo} from 'react';
import {
  Platform,
  StatusBar,
  View,
  SafeAreaView as RNSafeAreaView,
} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {useTheme} from '../../theme';
import {BlurView} from '@react-native-community/blur';
import {StyledWrapper, wrapperStyles} from './wrapper.styles';
import {useFocusEffect} from '@react-navigation/native';
import {SafeAreaView, useSafeAreaInsets} from 'react-native-safe-area-context';

// Red color constant for status bar
const RED_STATUS_BAR_COLOR = '#FF0000'; // You can change this to any shade of red you prefer

const BlurViewOverlay = memo(() => (
  <BlurView
    style={wrapperStyles.blurViewStyles}
    blurType="dark"
    blurAmount={2}
    reducedTransparencyFallbackColor={'#0D0D0DB2'}
  />
));

const Wrapper = props => {
  const {
    noShadow,
    header,
    noScroll,
    nestedScrollEnabled,
    isModalVisible,
    statusBarColor,
    barStyle,
    translucent,
    noLoader,
    bgColor,
    noPadding,
  } = props;
  const inset = useSafeAreaInsets();
  const {theme, font} = useTheme();

  useFocusEffect(() => {
    // Force red status bar for all pages
    StatusBar.setBarStyle('light-content'); // Use light content for better visibility on red background

    if (Platform.OS === 'android') {
      StatusBar.setBackgroundColor(RED_STATUS_BAR_COLOR);
    }
  });

  const WrapperContent = <StyledWrapper {...props} />;

  return (
    <>
      {statusBarColor !== 'transparent' &&
        (Platform.OS === 'android' ? (
          <RNSafeAreaView
            style={{
              width: '100%',
              flex: 1,
              marginTop: inset.top,
              backgroundColor: RED_STATUS_BAR_COLOR, // Use red color instead of theme color
            }}>
            {header}
            {noScroll ? (
              WrapperContent
            ) : (
              <KeyboardAwareScrollView
                contentContainerStyle={{flexGrow: 1}}
                showsHorizontalScrollIndicator={false}
                showsVerticalScrollIndicator={false}
                keyboardShouldPersistTaps="always"
                nestedScrollEnabled={true}
                scrollEnabled={true}>
                {WrapperContent}
              </KeyboardAwareScrollView>
            )}
            {isModalVisible && <BlurViewOverlay />}
          </RNSafeAreaView>
        ) : (
          <SafeAreaView
            style={{
              width: '100%',
              flex: 1,
              backgroundColor: RED_STATUS_BAR_COLOR, // Use red color instead of theme color
            }}>
            {header}
            {noScroll ? (
              WrapperContent
            ) : (
              <KeyboardAwareScrollView
                contentContainerStyle={{flexGrow: 1}}
                showsHorizontalScrollIndicator={false}
                showsVerticalScrollIndicator={false}
                keyboardShouldPersistTaps="always"
                nestedScrollEnabled={true}
                scrollEnabled={true}>
                {WrapperContent}
              </KeyboardAwareScrollView>
            )}
            {isModalVisible && <BlurViewOverlay />}
          </SafeAreaView>
        ))}

      {statusBarColor === 'transparent' && (
        <View
          style={{
            flex: 1,
          }}>
          {header}
          {noScroll ? (
            WrapperContent
          ) : (
            <KeyboardAwareScrollView
              contentContainerStyle={{flexGrow: 1}}
              showsHorizontalScrollIndicator={false}
              showsVerticalScrollIndicator={false}
              keyboardShouldPersistTaps="always"
              nestedScrollEnabled={true}
              scrollEnabled={true}>
              {WrapperContent}
            </KeyboardAwareScrollView>
          )}
          {isModalVisible && <BlurViewOverlay />}
        </View>
      )}

      {/* {isLoading && !noLoader && <Loader size={80} strokeWidth={10} />} */}
    </>
  );
};

export {Wrapper};