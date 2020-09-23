import styled from 'styled-components/native';

export const Container = styled.View`
  flex: 1;
  background-color: ${props => props.theme.colors.background};
`;

export const Content = styled.View`
  margin-top: 18px;
`;

export const Footer = styled.View`
  margin-top: 18px;
  padding: 18px;
  border-top-width: 1px;
  border-top-color: ${props => props.theme.colors.lineWhite};
  background-color: ${props => props.theme.colors.boxFooter};
  border-bottom-left-radius: 8px;
  border-bottom-right-radius: 8px;
`;
