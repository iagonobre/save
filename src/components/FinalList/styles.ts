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

export const TextFooter = styled.View`
  text-align: left;
`;

export const FooterContainer = styled.View`
  align-items: center;
  justify-content: center;
  width: 100%;
  flex-direction: row;
`;

export const Banner = styled.Image`
  width: 90px;
`;
