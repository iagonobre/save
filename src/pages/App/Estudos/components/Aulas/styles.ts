import styled from 'styled-components/native';

export const Container = styled.View`
  padding: 18px 0px 18px 0px;
`;

export const AulasContent = styled.View`
  width: 100%;
  max-height: 110px;
  padding: 18px;
  justify-content: center;
`;

export const ContentText = styled.Text`
  font-size: 10px;
  font-family: 'Poppins_400Regular';
  color: ${props => props.theme.colors.textBase};
`;

export const Content = styled.Text`
  font-size: 12px;
  font-family: 'Poppins_400Regular';
  color: ${props => props.theme.colors.textBase};
`;

export const ListContainer = styled.View`
  margin-top: 9px;
  margin-bottom: 18px;
  align-items: center;
  height: 200px;
  width: 100%;
`;

export const AulaContainer = styled.View`
  width: 289px;
  margin: 9px;
`;
