import styled from 'styled-components/native';
import { RectButton } from 'react-native-gesture-handler';

export const Container = styled.View`
  flex: 1;
  background-color: ${props => props.theme.colors.primaryDarker};
  justify-content: center;
  padding: 40px;
`;

export const ActionContainer = styled.View`
  width: 100%;
  background-color: ${props => props.theme.colors.background};
  justify-content: center;
  padding: 40px;
`;

export const Banner = styled.Image`
  width: 100%;
  margin-top: 20px;
`;

export const Title = styled.Text`
  font-family: 'Poppins_400Regular';
  color: ${props => props.theme.colors.textTitle};
  font-size: 20px;
  line-height: 30px;
  margin-top: 10px;
`;

export const TitleBold = styled.Text`
  font-family: 'Poppins_600SemiBold';
`;

export const ButtonsContainer = styled.View`
  flex-direction: row;
  margin-top: 20px;
  justify-content: space-between;
`;

export const Button = styled(RectButton)`
  height: 150px;
  width: 48%;
  border-radius: 8px;
  padding: 24px;
  justify-content: space-between;
  background-color: ${props => props.theme.colors.primaryDarker};
`;

export const ButtonSecondary = styled(Button)`
  background-color: ${props => props.theme.colors.secondary};
`;

export const ButtonText = styled.Text`
  font-family: 'Archivo_700Bold';
  color: #fff;
  font-size: 20px;
`;
