import styled from 'styled-components/native';
import { RectButton } from 'react-native-gesture-handler';

export const Container = styled.ScrollView`
  flex: 1;
  background-color: ${props => props.theme.colors.backgroundPurple};
`;

export const Modal = styled.View`
  height: 190px;
  justify-content: center;
  align-items: center;
  padding: 48px;
`;

export const ContentContainer = styled.View`
  flex: 1;
  align-items: center;
`;

export const Line = styled.View`
  height: 1px;
  background-color: ${props => props.theme.colors.line};
`;

export const InfoHeader = styled.View`
  flex-direction: row;
  justify-content: space-between;
  margin: 28px;
`;

export const ShareButton = styled(RectButton)`
  height: 41px;
  width: 41px;
  border-radius: 8px;
  align-items: center;
  padding-right: 2px;
  justify-content: center;
  background-color: ${props => props.theme.colors.secondary};
`;

export const PerfilContainer = styled.View`
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

export const InfoBox = styled.View`
  margin-right: 8px;
`;

export const Name = styled.Text`
  text-align: right;
  font-family: 'Archivo_700Bold';
  font-size: 16px;
  color: ${props => props.theme.colors.titlePrimary};
`;

export const Matricula = styled.Text`
  text-align: right;
  font-family: 'Poppins_400Regular';
  font-size: 12px;
  color: ${props => props.theme.colors.secondary};
`;

export const Avatar = styled.Image`
  width: 46px;
  height: 46px;
  background-color: ${props => props.theme.colors.lineWhite};
  border-radius: 23px;
`;

export const AvatarBorder = styled.TouchableOpacity`
  width: 50px;
  height: 50px;
  border-radius: 25px;
  border-width: 1px;
  align-items: center;
  justify-content: center;
  background-color: ${props => props.theme.colors.primary};
  border-color: ${props => props.theme.colors.secondary};
`;

export const ProgressContainer = styled.View`
  width: 100%;
  align-items: center;
  margin-bottom: 58px;
`;

export const Text = styled.Text`
  font-family: 'Archivo_700Bold';
  color: ${props => props.theme.colors.titlePrimary};
  font-size: 24px;
  line-height: 32px;
  max-width: 140px;
  margin-left: 28px;
  margin-top: 60%;
  position: absolute;
`;

export const Rocket = styled.Image`
  margin-top: 20%;
  width: 100%;
`;
