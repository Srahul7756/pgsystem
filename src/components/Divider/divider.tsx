import React from 'react';
import Svg, { Line } from 'react-native-svg';
import { View, StyleSheet } from 'react-native';

export const Divider = ({
  axis = 'horizontal',
  dashGap = 4,
  dashLength = 6,
  dashThickness = 2,
  dashColor,
  style,
}) => {
  const isHorizontal = axis === 'horizontal';

  return (
    <View style={[isHorizontal ? styles.horizontal : styles.vertical, style]}>
      <Svg
        width={isHorizontal ? '100%' : dashThickness}
        height={isHorizontal ? dashThickness : '100%'}>
        <Line
          x1={0}
          y1={0}
          x2={isHorizontal ? '100%' : 0}
          y2={isHorizontal ? 0 : '100%'}
          stroke={dashColor}
          strokeWidth={dashThickness}
          strokeDasharray={[dashLength, dashGap]} // Use array, not string
        />
      </Svg>
    </View>
  );
};

const styles = StyleSheet.create({
  horizontal: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  vertical: {
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
