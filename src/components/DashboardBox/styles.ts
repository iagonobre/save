import styled, { css } from 'styled-components/native';

interface StyleProps {
  isErrored: boolean;
  alignCenter?: boolean;
  height?: number;
}

export const Container = styled.View`
  margin-top: 18px;
  width: 100%;
`;

export const Content = styled.View<StyleProps>`
  border-bottom-left-radius: 8px;
  border-bottom-right-radius: 8px;
  border: 1px;
  border-color: ${props => props.theme.colors.lineWhite};
  background-color: ${props => props.theme.colors.boxFooter};
  justify-content: center;

  ${props =>
    props.height &&
    css`
      max-height: ${props.height}px;
    `}

  ${props =>
    props.alignCenter &&
    css`
      align-items: center;
    `}

  ${props =>
    props.isErrored &&
    css`
      border-color: ${props => props.theme.colors.warnColor};
    `}
`;

export const Header = styled.View<StyleProps>`
  background-color: ${props => props.theme.colors.lineWhite};
  width: 100%;
  height: 28px;
  align-items: center;
  justify-content: center;
  border-width: 1px;
  border-bottom-width: 0px;
  border-color: ${props => props.theme.colors.lineWhite};
  border-top-left-radius: 7px;
  border-top-right-radius: 7px;
  text-align: center;

  ${props =>
    props.isErrored &&
    css`
      border-color: ${props => props.theme.colors.warnColor};
    `}
`;

export const TextHeader = styled.Text<StyleProps>`
  font-size: 14px;
  padding: 0px 16px 0px 16px;
  font-family: 'Poppins_400Regular';
  color: ${props => props.theme.colors.textBase};

  ${props =>
    props.isErrored &&
    css`
      color: ${props => props.theme.colors.warnColor};
    `}
`;
