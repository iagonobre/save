import styled from 'styled-components/native';
import { Platform } from 'react-native';

export const Container = styled.View`
  flex: 1;
  background-color: ${props => props.theme.colors.backgroundPurple};
  justify-content: center;
  align-items: center;
  padding: 0px 40px ${Platform.OS === 'android' ? 65 : 40}px 40px;
`;
