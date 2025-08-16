import {StyleSheet} from 'react-native';
import styled from 'styled-components/native';

const Container = styled.View`
  /* Add your styles here */
  padding: 16px;
  background-color: #fff;
`;

const CustomSwitchStyles = StyleSheet.create({
  container: {
    justifyContent: 'center',
  },
  thumb: {
    position: 'absolute',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
});

export {Container, CustomSwitchStyles};
