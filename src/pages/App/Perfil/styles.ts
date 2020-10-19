import styled from 'styled-components/native';

export const Modal = styled.View`
  flex: 1;
  height: 190px;
  margin: 0px 18px 0px 18px;
  padding-bottom: 18px;
  justify-content: center;
  align-items: center;
`;

export const Container = styled.ScrollView`
  flex: 1;
  background-color: ${props => props.theme.colors.background};
`;

export const Tema = styled.View`
  margin-top: 18px;
`;

export const Profile = styled.View`
  padding: 28px;
  align-items: center;
`;

export const AvatarButton = styled.TouchableOpacity`
  width: 112px;
  height: 112px;
  border-radius: 56px;
`;

export const Avatar = styled.Image`
  width: 112px;
  height: 112px;
  border-radius: 56px;
  background-color: ${props => props.theme.colors.lineWhite};
`;
export const ProfileInfo = styled.View`
  align-items: center;
`;

export const Nome = styled.Text`
  margin-top: 8px;
  text-align: center;
  font-family: 'Archivo_700Bold';
  color: ${props => props.theme.colors.textPurple};
  font-size: 22px;
  max-width: 280px;
`;

export const Matricula = styled.Text`
  font-family: 'Poppins_400Regular';
  color: ${props => props.theme.colors.textBase};
  font-size: 16px;
  margin-top: 4px;
`;

export const Inputs = styled.View`
  margin: 18px;
`;

export const Line = styled.View`
  height: 1px;
  background-color: ${props => props.theme.colors.lineWhite};
`;

export const Bio = styled.View`
  margin: 18px;
`;

export const TextBold = styled.Text`
  font-family: 'Poppins_600SemiBold';
  font-size: 12px;
  color: ${props => props.theme.colors.textBase};
`;

export const Text = styled.Text`
  font-family: 'Poppins_400Regular';
  font-size: 12px;
  color: ${props => props.theme.colors.textBase};
`;

export const Footer = styled.View`
  margin-top: 18px;
  padding: 18px;
  border-top-width: 1px;
  border-top-color: ${props => props.theme.colors.lineWhite};
  background-color: ${props => props.theme.colors.boxFooter};
  border-bottom-left-radius: 8px;
  border-bottom-right-radius: 8px;
`;
