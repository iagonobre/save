import styled from 'styled-components/native';

export const Container = styled.ScrollView`
  flex: 1;
  background-color: ${props => props.theme.colors.background};
`;

export const TotalBox = styled.View`
  align-items: center;
  margin-top: 9px;
`;

export const Notification = styled.View`
  margin: 18px;
`;

export const Text = styled.Text`
  margin-top: 8px;
  margin-bottom: 18px;
  text-align: center;
  font-family: 'Archivo_700Bold';
  color: ${props => props.theme.colors.textPurple};
  font-size: 20px;
  max-width: 280px;
`;

export const Line = styled.View`
  height: 1px;
  background-color: ${props => props.theme.colors.lineWhite};
`;
