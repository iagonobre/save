import styled, { css } from 'styled-components/native';
import { Feather } from '@expo/vector-icons';

interface FocusedProps {
  isFocused: boolean;
  isErrored: boolean;
}

export const Container = styled.View<FocusedProps>`
  margin-top: 18px;
  width: 100%;
  height: 58px;
  padding: 0 16px;
  background-color: ${props => props.theme.colors.boxFooter};
  border-width: 2px;
  border-color: ${props => props.theme.colors.lineWhite};
  border-radius: 8px;
  flex-direction: row;
  align-items: center;

  ${props =>
    props.isFocused &&
    css`
      border-color: ${props => props.theme.colors.primaryLighter};
    `}
`;

export const TextInput = styled.TextInput`
  flex: 1;
  color: ${props => props.theme.colors.textComplement};
  font-size: 16px;
  font-family: 'Archivo_400Regular';
`;

export const Icon = styled(Feather)`
  margin-right: 16px;
`;
