import styled, { css } from 'styled-components/native';

interface InputProps {
  isErrored: boolean;
}

export const InputInfo = styled.Text<InputProps>`
  font-family: 'Poppins_400Regular';
  margin-left: 18px;
  font-size: 12px;
  color: ${props => props.theme.colors.textComplement};

  ${props =>
    props.isErrored &&
    css`
      color: ${props => props.theme.colors.warnColor};
    `}
`;

export const Container = styled.TextInput<InputProps>`
  height: 40px;
  background-color: ${props => props.theme.colors.boxFooter};
  border: 1px;
  border-color: ${props => props.theme.colors.lineWhite};
  border-radius: 8px;
  padding: 0px 18px 0px 18px;
  justify-content: center;
  align-items: center;
  margin: 4px 18px 18px 18px;

  color: ${props => props.theme.colors.textBase};
  font-size: 14px;
  font-family: 'Archivo_400Regular';

  ${props =>
    props.isErrored &&
    css`
      color: ${props => props.theme.colors.warnColor};
      border-color: ${props => props.theme.colors.warnColor};
    `}
`;
