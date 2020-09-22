import styled, { css } from 'styled-components/native';
import { RectButton } from 'react-native-gesture-handler';

interface ButtonProps {
  red: boolean;
}

export const Container = styled(RectButton)<ButtonProps>`
  width: 100%;
  margin-top: 18px;
  background-color: ${props => props.theme.colors.secondary};
  height: 58px;
  align-items: center;
  justify-content: center;
  border-radius: 8px;

  ${props =>
    props.red &&
    css`
      background-color: ${props => props.theme.colors.warnColor};
    `}
`;

export const ButtonText = styled.Text`
  color: ${props => props.theme.colors.buttonText};
  font-size: 16px;
  font-family: 'Archivo_700Bold';
`;
