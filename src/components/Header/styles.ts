import styled, { css } from 'styled-components/native';

interface Props {
  isTitlePage: boolean;
}

export const Container = styled.View`
  padding: 40px 20px 16px;
  background-color: ${props => props.theme.colors.primary};
`;

export const TopBar = styled.View<Props>`
  flex-direction: row;
  height: 32px;
  align-items: center;
  ${props =>
    props.isTitlePage
      ? css`
          justify-content: center;
        `
      : css`
          justify-content: space-between;
        `}
`;

export const Text = styled.Text`
  font-size: 14px;
  font-family: 'Poppins_400Regular';
  color: ${props => props.theme.colors.textPrimary};
`;

export const TitleContainer = styled.View`
  background-color: ${props => props.theme.colors.primaryDarker};
  padding: 40px;
`;

export const Title = styled.Text`
  font-family: 'Archivo_700Bold';
  color: ${props => props.theme.colors.titlePrimary};
  font-size: 24px;
  line-height: 32px;
  max-width: 140px;
  margin-bottom: 40px;
`;
