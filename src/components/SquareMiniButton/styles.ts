import styled, { css } from 'styled-components/native';

interface BoxColorProps {
  selected?: boolean;
}

export const RectBox = styled.View`
  align-items: center;
`;

export const Box = styled.TouchableOpacity<BoxColorProps>`
  border-radius: 8px;
  width: 56px;
  height: 56px;
  align-items: center;
  justify-content: center;
  ${props =>
    props.selected
      ? css`
          background-color: ${props => props.theme.colors.secondary};
        `
      : css`
          background-color: ${props => props.theme.colors.primary};
        `}
`;

export const TextBox = styled.Text`
  font-size: 10px;
  margin-top: 4px;
  font-family: 'Poppins_400Regular';
  color: ${props => props.theme.colors.textComplement};
`;
