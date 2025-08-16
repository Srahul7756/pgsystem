import React from 'react';
import {Text, View} from 'react-native';
import {Container, styles} from './noData.styles';
import {NoDataProps} from '../../types/componentTypes/NoDataTypes';
import {useTheme} from '../../theme/useTheme';
// import {NoDataIcon} from '@assets/common';
import {TextView} from '../../components/TextView';
import {
  NO_RECORDS_FOUND,
} from '../../constants/Textkeys';
import {Spacer} from '../../components/Spacer';

export const NoData: React.FC<NoDataProps> = props => {
  const {theme, font} = useTheme();
  const {message, title} = props;
  return (
    <View
      style={{
        alignItems: 'center',
      }}>
      <Spacer height={20} />
      <TextView
        size={font.fontConfig.fontSizes.font14}
        color={theme.colors.darkBlack}
        weight={font.fontConfig.fontWeights.xMedium}
        title={NO_RECORDS_FOUND}
      />
    </View>
  );
};
