import styled from 'styled-components/native';

export const Container = styled.ScrollView`
  background-color: ${props => props.theme.colors.background};
  height: 1900px;
`;

export const BoxHeader = styled.View`
  padding: 18px 0px 18px 0px;
`;

export const NavBarContainer = styled.View`
  margin: 18px;
  justify-content: space-between;
  flex-direction: row;
`;

export const Line = styled.View`
  height: 1px;
  background-color: ${props => props.theme.colors.lineWhite};
`;

export const Banner = styled.Image`
  width: 100%;
  margin: 8px;
`;

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
