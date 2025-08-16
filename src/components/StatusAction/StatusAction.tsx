import React from 'react';
import { View, StyleSheet } from 'react-native';
import { useTheme } from '@theme/useTheme';
import { TextView } from '@components/TextView';
import { FailedBadge, SuccessBadge } from '@assets/common';
import { Spacer } from '@components/Spacer';

const StatusAction = ({ title, subTitle, actions, status }) => {
  const { theme, font } = useTheme();

  return (
    <View
      style={[styles.modalContainer, { backgroundColor: theme.colors.white }]}>
      {status === 'SUCCESS' ? <SuccessBadge /> : <FailedBadge />}
      <Spacer height={16} />
      <TextView
        title={title}
        size={20}
        color={theme.colors.black}
        weight={font.fontConfig.fontWeights.bold}
        style={styles.titleSpacing}
        centerText
      />

      <TextView
        title={subTitle}
        size={14}
        color={theme.colors.gray}
        style={styles.subtitleSpacing}
        centerText
      />
      <View style={{ width: '100%' }}>{actions}</View>
    </View>
  );
};

export { StatusAction };

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    flex: 1,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  statusImage: {
    width: 48,
    height: 48,
    marginBottom: 24,
  },
  titleSpacing: {
    lineHeight: 20,
    marginBottom: 8,
  },
  subtitleSpacing: {
    lineHeight: 20,
    marginBottom: 24,
  },
});
