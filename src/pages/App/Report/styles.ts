import styled from 'styled-components/native';

export const Container = styled.ScrollView`
  flex: 1;
  background-color: ${props => props.theme.colors.background};
`;

export const TotalBox = styled.View`
  padding-top: 18px;
  padding-bottom: 18px;
`;

export const Notification = styled.View`
  margin: 18px;
`;

export const Text = styled.Text`
  margin-top: 8px;
  margin-bottom: 18px;
  text-align: center;
  font-family: 'Archivo_700Bold';
  color: ${props => props.theme.colors.textPurple};
  font-size: 20px;
  max-width: 280px;
`;

export const Line = styled.View`
  height: 1px;
  background-color: ${props => props.theme.colors.lineWhite};
`;

export const SmallText = styled.Text`
  font-family: 'Poppins_400Regular';
  font-size: 10px;
  text-align: center;
  width: 100%;
  padding-right: 22px;
  padding-left: 22px;
  margin-bottom: 18px;
  color: ${props => props.theme.colors.textComplement};
`;

export const InputInfo = styled.Text`
  font-family: 'Poppins_400Regular';
  font-size: 12px;
  color: ${props => props.theme.colors.textComplement};
`;
