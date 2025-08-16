import {View} from 'react-native';
import {useTheme} from '../../theme';
import React from 'react';

interface SeperatorProps {
  height?: number;
  backgroundColor?: string;
}

const SeparatorComponent = ({height, backgroundColor}: SeperatorProps) => {
  const {theme} = useTheme();

  return (
    <View
      style={{
        borderBottomWidth: height || 1,
        borderBottomColor: backgroundColor || theme.colors.neutral.light,
      }}></View>
  );
};

export {SeparatorComponent};
