import styled from 'styled-components/native';

export const BoxBase = styled.View`
  margin: -60px 16px 24px 16px;
  background-color: ${props => props.theme.colors.boxBase};
  border-width: 1px;
  border-color: ${props => props.theme.colors.lineWhite};
  border-radius: 8px;
`;
