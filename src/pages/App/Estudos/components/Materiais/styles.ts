import styled from 'styled-components/native';
import { RectButton } from 'react-native-gesture-handler';

export const Container = styled.View`
  padding: 18px 0px 18px 0px;
`;

export const BoxDownload = styled.View`
  margin-top: 18px;
  border-radius: 8px;
  border: 1px;
  border-color: ${props => props.theme.colors.lineWhite};
  background-color: ${props => props.theme.colors.boxFooter};
  height: 60px;
  width: 100%;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

export const TextContainer = styled.View`
  text-align: left;
  margin-left: 18px;
  max-width: 200px;
`;

export const BoxText = styled.Text`
  font-size: 12px;
  font-family: 'Poppins_400Regular';
  color: ${props => props.theme.colors.textBase};
`;

export const DateText = styled.Text`
  font-size: 9px;
  font-family: 'Poppins_400Regular';
  color: ${props => props.theme.colors.textBase};
`;

export const DownloadButton = styled(RectButton)`
  background-color: ${props => props.theme.colors.lineWhite};
  height: 60px;
  width: 60px;
  border-radius: 8px;
  align-items: center;
  justify-content: center;
`;

export const ListContainer = styled.View`
  align-items: center;
  margin: 18px;
`;
