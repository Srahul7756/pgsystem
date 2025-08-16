import {StyleSheet} from 'react-native';
import styled from 'styled-components/native';

const Container = styled.View`
  /* Add your styles here */
  padding: 16px;
  background-color: #fff;
`;

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    borderWidth: 1,
    justifyContent: 'center',
    flex: 1,
    flexGrow: 1,
    borderRadius: 8,
  },
});

export {Container, styles};
