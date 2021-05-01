import styled, { css } from 'styled-components/native';

interface PeriodButtonProps {
  isCurrentPeriod: boolean;
}

interface GradeTextProps {
  redColor: boolean;
}

export const Container = styled.ScrollView`
  background-color: ${props => props.theme.colors.background};
  height: 1900px;
`;

export const BoxHeader = styled.View`
  padding: 18px 0px 18px 0px;
`;

export const NavBarContainer = styled.View`
  margin: 18px;
  justify-content: space-between;
  flex-direction: row;
`;

export const Line = styled.View`
  height: 1px;
  background-color: ${props => props.theme.colors.lineWhite};
`;

export const Banner = styled.Image`
  width: 100%;
  margin: 8px;
`;

export const SearchTitle = styled.Text`
  font-size: 14px;
  font-family: 'Archivo_700Bold';
  color: ${props => props.theme.colors.textBase};
`;

export const SearchSubtitle = styled.Text`
  font-size: 12px;
  font-family: 'Poppins_400Regular';
  color: ${props => props.theme.colors.textBase};
`;

export const SearchContainer = styled.View`
  margin: 32px;
  align-items: center;
  text-align: center;
`;

export const PeriodsContainer = styled.ScrollView`
  width: 100%;
  height: 48px;
  margin: 8px 0px 2px 0px;
`;

export const PeriodButton = styled.TouchableOpacity<PeriodButtonProps>`
  width: 80px;
  height: 30px;
  align-items: center;
  justify-content: center;
  background-color: ${props => props.theme.colors.boxFooter};

  border-width: 1px;
  border-color: ${props =>
    props.isCurrentPeriod
      ? props.theme.colors.textPurple
      : props.theme.colors.lineWhite};
  border-radius: 8px;

  margin-left: 18px;
`;

export const PeriodText = styled.Text<PeriodButtonProps>`
  font-family: 'Poppins_400Regular';
  font-size: 12px;
  color: ${props =>
    props.isCurrentPeriod
      ? props.theme.colors.textPurple
      : props.theme.colors.textComplement};
`;

export const GradeHeaderContainer = styled.View`
  width: 100%;
  padding: 8px;
  flex-direction: row;
  justify-content: space-between;
`;

export const GradeType = styled.Text`
  font-family: 'Poppins_400Regular';
  font-size: 10px;
  max-width: 45%;
  color: ${props => props.theme.colors.textComplement};
`;

export const GradeSemestersContainer = styled.View`
  width: 50%;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

export const Grade = styled.View`
  width: 28px;
  height: 28px;
  border-radius: 4px;
  align-items: center;
  justify-content: center;
  background-color: ${props => props.theme.colors.lineWhite};
`;

export const GradeText = styled.Text<GradeTextProps>`
  font-family: 'Archivo_700Bold';
  font-size: 14px;
  color: ${props => props.theme.colors.textPurple};

  ${props =>
    props.redColor &&
    css`
      color: ${props => props.theme.colors.warnColor};
    `}
`;
