import React from 'react';
import {useSelector} from 'react-redux';
import {useTheme} from '@theme/useTheme';
import {RootState} from '@store/index';
import {ActivityIndicator, Modal, View} from 'react-native';

const AppLoader = () => {
  const isLoading = useSelector((state: RootState) => state.loader.isLoading);
  const {theme} = useTheme();

  if (!isLoading) {
    return null;
  }

  return (
    <Modal
      visible={isLoading}
      transparent
      animationType="none"
      hardwareAccelerated
      statusBarTranslucent
      onRequestClose={() => {}}>
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: 'rgba(0,0,0,0.4)',
          zIndex: 9999,
        }}>
        <ActivityIndicator size="large" color={theme.colors.splashbackground} />
      </View>
    </Modal>
  );
};

export default AppLoader;
