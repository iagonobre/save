import styled from 'styled-components/native';

export const StatusContent = styled.Text`
  font-size: 14px;
  text-align: center;
  max-width: 90%;
  font-family: 'Poppins_400Regular';
  color: ${props => props.theme.colors.textBase};
`;

export const StatusBold = styled.Text`
  font-size: 14px;
  font-family: 'Poppins_600SemiBold';
  color: ${props => props.theme.colors.textBase};
`;
