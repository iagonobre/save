import styled from 'styled-components/native';
import { RectButton } from 'react-native-gesture-handler';

export const InfoHeaderContainer = styled.View`
  flex-direction: row;
  justify-content: space-between;
  margin: 28px;
`;

export const ActionsButton = styled.View`
  flex-direction: row;
`;

export const NotifyCircle = styled.View`
  width: 8px;
  height: 8px;
  border-radius: 4px;
  position: absolute;
  top: 6px;
  right: 8px;
  background-color: ${props => props.theme.colors.warnColor};
`;

export const ShareButton = styled(RectButton)`
  height: 41px;
  width: 41px;
  border-radius: 8px;
  align-items: center;
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
