import styled, { css } from 'styled-components/native';

interface InputProps {
  isErrored?: boolean;
}

export const PickerTitle = styled.Text<InputProps>`
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
