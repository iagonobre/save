import styled from 'styled-components/native';

export const Container = styled.View`
  flex: 1;
  background-color: ${props => props.theme.colors.backgroundPurple};
`;

export const ContainerNotification = styled.View`
  width: 100%;
  padding: 0px 28px 28px 28px;
`;

export const NoNotificationsTitle = styled.Text`
  font-size: 18px;
  width: 180px;
  font-family: 'Poppins_600SemiBold';
  color: ${props => props.theme.colors.titlePrimary};
`;

export const NoNotificationContainer = styled.View`
  width: 100%;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
`;

export const NoNotificationContentContainer = styled.View`
  height: 80%;
  width: 100%;
  padding: 0px 24px 0px 24px;
  border-radius: 8px;
  background-color: ${props => props.theme.colors.line};
  justify-content: center;
  align-items: center;
`;

export const NoNotificationsImage = styled.Image``;

export const SwipeableTrash = styled.View`
  justify-content: center;
  align-items: center;
  height: 104px;
  width: 30%;
  background-color: ${props => props.theme.colors.primaryLighter};
  border-bottom-right-radius: 8px;
  border-top-right-radius: 8px;
`;

export const TrashLeft = styled.View`
  justify-content: space-between;
  flex-direction: row;
`;

export const TrashButton = styled.TouchableOpacity`
  margin: 18px 0px 18px 0px;
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;

export const TrashTitle = styled.Text`
  font-size: 12px;
  margin-right: 4px;
  font-family: 'Poppins_400Regular';
  color: ${props => props.theme.colors.titlePrimary};
`;
export const BlockTitle = styled.Text`
  font-size: 14px;
  text-align: center;
  font-family: 'Poppins_400Regular';
  color: ${props => props.theme.colors.titlePrimary};
`;

export const ContentContainer = styled.ScrollView`
  height: 65%;
  width: 100%;
  padding: 0px 12px 0px 12px;
  border-radius: 8px;
  background-color: ${props => props.theme.colors.line};
`;

export const NotifyContainer = styled.View`
  margin-bottom: 8px;
  height: 104px;
  border-radius: 8px;
  width: 100%;
  background-color: ${props => props.theme.colors.primaryLight};
  padding: 12px;
  justify-content: center;
  z-index: 1000;
`;

export const NotifyText = styled.Text`
  font-family: 'Poppins_600SemiBold';
  font-size: 12px;
  color: ${props => props.theme.colors.titlePrimary};
`;

export const NotifyDescription = styled.Text`
  font-family: 'Poppins_400Regular';
  font-size: 10px;
  color: ${props => props.theme.colors.titlePrimary};
`;

export const NotifyDate = styled.Text`
  font-family: 'Poppins_400Regular';
  font-size: 12px;
  color: ${props => props.theme.colors.secondaryDark};
`;
