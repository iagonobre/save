import styled from 'styled-components/native';
import { RectButton } from 'react-native-gesture-handler';

export const Container = styled.View`
  padding: 18px 0px 18px 0px;
`;

export const ProfInfo = styled.View`
  text-align: left;
  margin-left: 18px;
`;

export const ProfAvatar = styled.View`
  max-width: 190px;
  height: 50px;
  margin: 18px;
  justify-content: center;
  align-items: center;
  flex-direction: row;
`;

export const Avatar = styled.Image`
  height: 54px;
  width: 54px;
  border-radius: 27px;
  background-color: ${props => props.theme.colors.lineWhite};
`;

export const ProfName = styled.Text`
  font-family: 'Archivo_700Bold';
  color: ${props => props.theme.colors.textPurple};
  font-size: 16px;
`;

export const ProfText = styled.Text`
  font-size: 12px;
  font-family: 'Poppins_400Regular';
  color: ${props => props.theme.colors.textBase};
`;

export const ProfLine = styled.View`
  width: 100%;
  height: 1px;
  background-color: ${props => props.theme.colors.lineWhite};
`;

export const ProfEmail = styled.View`
  flex-direction: row;
  justify-content: space-between;
  padding: 18px;
`;

export const EmailBox = styled.View`
  text-align: left;
  justify-content: center;
`;

export const ContentText = styled.Text`
  font-size: 10px;
  font-family: 'Poppins_400Regular';
  color: ${props => props.theme.colors.textBase};
`;

export const EmailButton = styled(RectButton)`
  width: 40px;
  height: 40px;
  border-radius: 8px;
  margin-left: 80px;
  background-color: ${props => props.theme.colors.secondary};
  align-items: center;
  justify-content: center;
`;

export const ContentBox = styled.View`
  text-align: left;
  padding: 18px;
  justify-content: center;
`;

export const ListContainer = styled.View`
  align-items: center;
  margin: 18px;
`;
