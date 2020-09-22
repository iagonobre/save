import styled from 'styled-components/native';

export const Container = styled.ScrollView`
  flex: 1;
  background-color: ${props => props.theme.colors.background};
`;

export const PickerContainer = styled.View`
  padding: 18px 0px 18px 0px;
`;

export const Line = styled.View`
  height: 1px;
  background-color: ${props => props.theme.colors.lineWhite};
`;

export const Banner = styled.Image`
  width: 100%;
  margin: 28px 0px 8px 0px;
`;

export const ButtonContainer = styled.View`
  padding: 18px;
`;
