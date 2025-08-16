import React from 'react';
import {StyledCard, StyledView} from './cardview.styles';
import {CardviewProps} from '@componentTypes/CardviewTypes';

const Cardview: React.FC<CardviewProps> = props => {
  const {children, height, width, onPress, padding, noPadding} = props;
  return (
    <StyledCard
      activeOpacity={8}
      height={height}
      width={width}
      onPress={onPress}>
      <StyledView padding={padding} noPadding={noPadding}>
        {children}
      </StyledView>
    </StyledCard>
  );
};

export {Cardview};
