import styled, { css } from 'styled-components/native';

interface NoteProps {
  redColor: boolean;
}

export const Container = styled.View`
  align-items: center;
`;

export const SquadNote = styled.View`
  width: 54px;
  height: 54px;
  align-items: center;
  justify-content: center;
  border-radius: 8px;
  background-color: ${props => props.theme.colors.lineWhite};
`;

export const Note = styled.Text<NoteProps>`
  font-family: 'Archivo_700Bold';
  font-size: 20px;
  color: ${props => props.theme.colors.textPurple};

  ${props =>
    props.redColor &&
    css`
      color: ${props => props.theme.colors.warnColor};
    `}
`;

export const SquadInfo = styled.Text<NoteProps>`
  font-size: 10px;
  margin-top: 4px;
  font-family: 'Poppins_400Regular';
  color: ${props => props.theme.colors.textComplement};

  ${props =>
    props.redColor &&
    css`
      color: ${props => props.theme.colors.warnColor};
    `}
`;
