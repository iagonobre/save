import styled from 'styled-components/native';

export const Container = styled.View`
  padding: 18px 0px 18px 0px;
`;

export const BoletimContainer = styled.View`
  align-items: center;
  margin: 18px;
`;

export const ReportContainer = styled.View`
  flex-direction: row;
  justify-content: space-between;
  width: 100%;
  padding: 18px;
`;

export const Line = styled.View`
  height: 1px;
  width: 100%;
  background-color: ${props => props.theme.colors.lineWhite};
`;

export const StatusTitle = styled.Text`
  font-size: 12px;
  margin-top: 18px;
  font-family: 'Poppins_400Regular';
  color: ${props => props.theme.colors.textBase};
`;

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

export const Banner = styled.Image`
  width: 100%;
  margin: 20px;
`;
