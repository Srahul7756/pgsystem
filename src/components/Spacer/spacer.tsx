import {SpacerProps} from '@componentTypes/SpacerTypes';
import {View} from 'react-native';
import {styled} from 'styled-components';

const defaultSize = 16;

export const Spacer = styled(View)<SpacerProps>(({width, height, grow}) => ({
  width: width || defaultSize,
  height: height || defaultSize,
  ...(grow ? {flex: 1} : {}),
}));
