import React, {useEffect, useRef} from 'react';
import {ViewStyle} from 'react-native';
import {View, Animated, Easing, StyleSheet} from 'react-native';
import Svg, {Circle} from 'react-native-svg';

const AnimatedCircle = Animated.createAnimatedComponent(Circle);

interface CircularLoaderProps {
  size?: number; // diameter of the spinner
  strokeWidth?: number; // thickness of the stroke
  arcFraction?: number; // fraction of the circle that forms the visible arc (0 < arcFraction < 1)
  customContainerStyle?: ViewStyle;
}

const roundLoader: React.FC<CircularLoaderProps> = ({
  size = 60,
  strokeWidth = 6,
  arcFraction = 0.3, // 30% arc, 70% gap
  customContainerStyle,
}) => {
  // Animated value that goes from 0 -> 1 (looped)
  const animatedValue = useRef(new Animated.Value(0)).current;

  // Calculate circle geometry
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  // Arc portion vs. gap
  const arcLength = circumference * arcFraction;
  const gapLength = circumference - arcLength;

  // Spin the arc indefinitely
  useEffect(() => {
    Animated.loop(
      Animated.timing(animatedValue, {
        toValue: 1,
        duration: 1200, // speed of rotation
        easing: Easing.linear,
        useNativeDriver: true,
      }),
    ).start();
  }, [animatedValue]);

  // Animate strokeDashoffset from 0 -> circumference
  // This shifts the arc around the circle.
  const strokeDashoffset = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: [circumference, 0],
  });

  const defaultStyle: ViewStyle = {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0, 0.3)',
    zIndex: 1000,
    ...StyleSheet.absoluteFillObject,
  };

  return (
    <View style={customContainerStyle || defaultStyle}>
      <View style={{justifyContent: 'center', alignItems: 'center'}}>
        <Svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
          {/* Optional background circle (dimmed) */}
          <Circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke="#063D6F"
            strokeWidth={strokeWidth}
            fill="none"
            opacity={0.3}
          />

          {/* The traveling arc */}
          <AnimatedCircle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke="#063D6F"
            strokeWidth={strokeWidth}
            fill="none"
            strokeDasharray={`${arcLength} ${gapLength}`}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
          />
        </Svg>
      </View>
    </View>
  );
};

export {roundLoader};
