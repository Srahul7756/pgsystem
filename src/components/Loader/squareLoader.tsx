import {useTheme} from '../../theme/useTheme';
import React, {useEffect, useRef} from 'react';
import {View, Animated, StyleSheet, Easing} from 'react-native';

const SquareDotsLoader = () => {
  const {theme} = useTheme();
  const dotAnimations = [
    useRef(new Animated.Value(0)).current,
    useRef(new Animated.Value(0)).current,
    useRef(new Animated.Value(0)).current,
  ];

  useEffect(() => {
    const animations = dotAnimations.map((anim, index) =>
      Animated.loop(
        Animated.sequence([
          Animated.timing(anim, {
            toValue: 1,
            duration: 300,
            easing: Easing.linear,
            useNativeDriver: false,
          }),
          Animated.timing(anim, {
            toValue: 0,
            duration: 300,
            easing: Easing.linear,
            useNativeDriver: false,
          }),
        ]),
      ),
    );

    animations.forEach((anim, index) => {
      setTimeout(() => anim.start(), index * 150); // Delay each animation
    });
  }, []);

  return (
    <View style={styles.container}>
      {dotAnimations.map((anim, index) => {
        const backgroundColor = anim.interpolate({
          inputRange: [0, 1],
          outputRange: [
            theme.colors.blue.lightActive,
            theme.colors.blue.normal,
          ], // Light when inactive, Dark when active
        });

        return (
          <Animated.View
            key={index}
            style={[
              styles.dot,
              {
                backgroundColor,
              },
            ]}
          />
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 2,
  },
});

export default SquareDotsLoader;
