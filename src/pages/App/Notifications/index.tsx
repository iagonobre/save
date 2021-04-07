import { Feather } from '@expo/vector-icons';
import React, { useCallback, useContext, useRef } from 'react';
import { View } from 'react-native';
import { ThemeContext } from 'styled-components';

import format from 'date-fns/format';

import Swipeable from 'react-native-gesture-handler/Swipeable';
import { Modalize } from 'react-native-modalize';

import { NOTIFICATIONS } from 'expo-permissions';
import Header from '../../../components/Header';
import InfoHeader from '../../../components/InfoHeader';
import Button from '../../../components/Button';
import nonotification from '../../../assets/images/clearnotify.png';

import { useNotifications } from '../../../hooks/notifications';
import { useAuth } from '../../../hooks/auth';

import {
  Container,
  ContainerNotification,
  ContentContainer,
  TrashLeft,
  TrashButton,
  TrashTitle,
  NotifyContainer,
  NotifyDescription,
  NotifyDate,
  NotifyText,
  SwipeableTrash,
  NoNotificationsTitle,
  NoNotificationsImage,
  BlockTitle,
  NoNotificationContentContainer,
  NoNotificationContainer,
} from './styles';
import { api } from '../../../services/api';

const Notifications: React.FC = () => {
  const modalizeRef = useRef<Modalize>(null);
  const { colors } = useContext(ThemeContext);
  const { primaryLight } = colors;
  const {
    notifications,
    deleteOneNotification,
    deleteAllNotification,
  } = useNotifications();
  const { student, token, updateUser } = useAuth();
  const { notification } = student;

  const TrashAction = () => {
    return (
      <SwipeableTrash>
        <Feather name="trash" size={28} color={colors.warnColor} />
      </SwipeableTrash>
    );
  };

  const handleAuthorizeNotification = useCallback(async () => {
    const response = await api.post(
      '/notifications',
      {
        authorized: true,
      },
      {
        headers: { Authorization: `Bearer ${token}` },
      },
    );
    updateUser(response.data, token);
  }, [token, updateUser]);

  const handleDeleteAllNotification = useCallback(() => {
    modalizeRef.current?.open();
  }, []);

  return (
    <>
      <Modalize
        adjustToContentHeight
        ref={modalizeRef}
        snapPoint={190}
        handleStyle={{ backgroundColor: colors.boxFooter }}
        modalStyle={{ backgroundColor: colors.background, padding: 18 }}
      >
        <Button
          onPress={() => {
            deleteAllNotification();
            modalizeRef.current?.close();
          }}
          style={{ marginBottom: 36 }}
          redButton
        >
          CONFIRMAR
        </Button>
      </Modalize>

      <Container>
        <Header back screenName="Home" />
        <InfoHeader />

        {!notification ? (
          <ContainerNotification>
            <NoNotificationContentContainer>
              <BlockTitle>
                Ao autorizar, você permite o acesso periódico dos seus dados
                referentes ao boletim e às turmas virtuais a fim de possibilitar
                a busca de novas atualizações sobre esses dados e notificá-los,
                assim como descrito na SEÇÃO 9 da nossa política de privacidade.
                Você poderá desativar quando quiser na aba “Perfil”.
              </BlockTitle>
              <Button redButton onPress={handleAuthorizeNotification}>
                AUTORIZAR
              </Button>
            </NoNotificationContentContainer>
          </ContainerNotification>
        ) : notifications.length === 0 ? (
          <ContainerNotification>
            <NoNotificationContentContainer>
              <NoNotificationContainer>
                <NoNotificationsTitle>
                  Nenhuma notificação disponível
                </NoNotificationsTitle>
                <NoNotificationsImage
                  resizeMode="contain"
                  source={nonotification}
                />
              </NoNotificationContainer>
            </NoNotificationContentContainer>
          </ContainerNotification>
        ) : (
          <ContainerNotification>
            <ContentContainer>
              <TrashLeft>
                <View />
                <TrashButton onPress={handleDeleteAllNotification}>
                  <TrashTitle>Excluir todas</TrashTitle>
                  <Feather name="trash" size={19} color={colors.titlePrimary} />
                </TrashButton>
              </TrashLeft>
              {notifications.map(notify => {
                const date = format(notify.completedAt, 'dd/MM/yyyy');
                return (
                  <Swipeable
                    key={notify.id}
                    onSwipeableRightOpen={() => {
                      deleteOneNotification(notify.id);
                    }}
                    friction={4}
                    renderRightActions={TrashAction}
                    containerStyle={{
                      width: '100%',
                      backgroundColor: primaryLight,
                      height: 104,
                      borderRadius: 8,
                      marginBottom: 8,
                    }}
                  >
                    <NotifyContainer>
                      <NotifyText>{notify.title}</NotifyText>
                      <NotifyDescription>{notify.content}</NotifyDescription>
                      <NotifyDate>{date}</NotifyDate>
                    </NotifyContainer>
                  </Swipeable>
                );
              })}
            </ContentContainer>
          </ContainerNotification>
        )}
      </Container>
    </>
  );
};

export default Notifications;
