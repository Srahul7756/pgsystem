import React, {useEffect, useRef, useState} from 'react';
import {View, Image} from 'react-native';
import {styles} from './avatar.styles';
import {AvatarProps} from '../../types/componentTypes/AvatarTypes';
import {useTheme} from '../../theme/useTheme';
import {TextView} from '../../components/index';

export const Avatar: React.FC<AvatarProps> = ({
  img,
  placeholder,
  width,
  height,
  roundedImage = true,
  roundedPlaceholder = true,
  style,
}) => {
  const imageContainerRef = useRef<View>(null);

  const [containerStyle, setContainerStyle] = useState<StyleSheet.Styles>({
    ...styles.container,
    width,
    height,
  });
  const borderRadius = roundedImage
    ? Math.round(width + height) / 2
    : undefined;
  const {theme, font} = useTheme();
  const viewStyle = [styles.imageContainer, {borderRadius: borderRadius}];

  useEffect(() => {
    setContainerStyle(viewStyle);
  }, [width, height, borderRadius]);

  const renderImage = () => (
    <View style={containerStyle} ref={imageContainerRef}>
      <Image style={styles.image} source={img} />
    </View>
  );

  const renderPlaceholder = () => {
    const viewStyle = [styles.imageContainer, {borderRadius: borderRadius}];

    return (
      <View style={[viewStyle, {backgroundColor: theme.colors.blue.light}]}>
        <TextView
          color={theme.colors.blue.normal}
          title={placeholder}
          size={font.fontConfig.fontSizes.font16}
          weight={font.fontConfig.fontWeights.bold}
          style={{
            lineHeight: 19.36,
          }}
        />
      </View>
    );
  };

  return (
    <View style={[styles.container, style, {width, height}]}>
      {img ? renderImage() : renderPlaceholder()}
    </View>
  );
};
