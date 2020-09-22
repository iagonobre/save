import styled from 'styled-components/native';

export const Container = styled.View`
  height: 48%;
  background-color: #e9bf52;
`;

export const ActionContainer = styled.View`
  width: 100%;
  background-color: ${props => props.theme.colors.background};
  justify-content: center;
  padding: 40px;
`;

export const Banner = styled.Image`
  width: 100%;
  position: absolute;
  bottom: -8px;
`;

export const InfoTitle = styled.Text`
  font-family: 'Archivo_700Bold';
  font-size: 40px;
  color: #dbdbdb;
`;

export const Title = styled.Text`
  font-family: 'Poppins_500Medium';
  color: ${props => props.theme.colors.textBase};
  font-size: 20px;
  line-height: 34px;
  margin-top: 10px;
`;

export const TitleBold = styled.Text`
  font-family: 'Poppins_600SemiBold';
`;

export const Footer = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-top: 28px;
`;

export const Details = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;

export const DetailYellow = styled.View`
  width: 4px;
  height: 4px;
  margin-left: 8px;
  background-color: #e9bf52;
  border-radius: 1px;
`;

export const DetailGrey = styled.View`
  width: 4px;
  height: 4px;
  background-color: #c1bccc;
  border-radius: 1px;
`;
