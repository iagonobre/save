import styled from 'styled-components/native';
import { Dimensions } from 'react-native';

interface ProgressProps {
  progress: number;
}

export const Container = styled.View`
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

export const Rocket = styled.Image`
  width: 100%;
  height: ${Math.round(Dimensions.get('window').height)}px;
  bottom: ${80 % Math.round(Dimensions.get('window').height)}px;
  z-index: -1000;
`;

export const ProgressBox = styled.View`
  width: 100%;
  height: 4px;
  border-bottom-right-radius: 8px;
  background-color: ${props => props.theme.colors.line};
`;

export const ProgressBar = styled.View<ProgressProps>`
  width: ${props => props.progress}%;
  height: 4px;
  border-bottom-left-radius: 8px;
  border-bottom-right-radius: ${props => (props.progress !== 100 ? 0 : 8)}px;
  background-color: ${props => props.theme.colors.secondaryDark};
`;

export const ProgressContainer = styled.View`
  width: 100%;
  padding: 0px 28px 0px 28px;
`;

export const ModeContainer = styled.View`
  height: 58px;
  width: 100%;
  border-top-right-radius: 8px;
  border-top-left-radius: 8px;
  background-color: ${props => props.theme.colors.line};
  padding: 18px 0 18px 18px;
  justify-content: center;
`;

// align-items: center;
// flex-direction: row;
// justify-content: space-between;

export const ModeButton = styled.View`
  height: 58px;
  width: 58px;
  border-radius: 8px;
  align-items: center;
  justify-content: center;
  background-color: rgba(255, 255, 255, 0.1);
`;
