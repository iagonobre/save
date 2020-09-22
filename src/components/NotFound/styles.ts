import styled from 'styled-components/native';

export const SearchTitle = styled.Text`
  font-size: 14px;
  font-family: 'Archivo_700Bold';
  color: ${props => props.theme.colors.textBase};
`;

export const SearchSubtitle = styled.Text`
  font-size: 12px;
  font-family: 'Poppins_400Regular';
  color: ${props => props.theme.colors.textBase};
`;

export const SearchContainer = styled.View`
  margin: 32px;
  align-items: center;
  text-align: center;
`;

export const Banner = styled.Image`
  width: 100%;
`;
