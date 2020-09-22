import styled from 'styled-components/native';

export const Container = styled.View`
  align-items: center;
  text-align: center;
`;

export const Title = styled.Text`
  font-size: 20px;
  font-family: 'Archivo_700Bold';
  color: ${props => props.theme.colors.textTitle};
`;
export const Subtitle = styled.Text`
  margin-top: 4px;
  font-size: 12px;
  font-family: 'Poppins_400Regular';
  color: ${props => props.theme.colors.textBase};
`;
