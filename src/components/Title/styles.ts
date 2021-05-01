import { RectButton } from 'react-native-gesture-handler';
import styled from 'styled-components/native';

export const TitleContainer = styled.View`
  background-color: ${props => props.theme.colors.primaryDarker};
  padding: 40px;
`;

export const BoxAvatar = styled.View`
  background-color: ${props => props.theme.colors.primaryDarker};
  width: 100%;
  justify-content: space-between;
  align-items: center;
  flex-direction: row;
  margin-bottom: 37px;
`;

export const Avatar = styled.Image`
  width: 64px;
  height: 64px;
  border-radius: 32px;
  background-color: ${props => props.theme.colors.lineWhite};
`;

export const Title = styled.Text`
  font-family: 'Archivo_700Bold';
  color: ${props => props.theme.colors.titlePrimary};
  font-size: 24px;
  line-height: 32px;
  max-width: 140px;
  margin-bottom: 40px;
`;

export const ShareButton = styled(RectButton)`
  height: 41px;
  width: 41px;
  border-radius: 8px;
  margin-bottom: 40px;
  align-items: center;
  justify-content: center;
  background-color: ${props => props.theme.colors.secondary};
`;

export const ReportContainer = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

export const Circle = styled.View`
  width: 8px;
  height: 8px;
  border-radius: 4px;
  position: absolute;
  top: 6px;
  right: 6px;
  background-color: ${props => props.theme.colors.warnColor};
`;
