import React, {
  useEffect,
  useContext,
  useCallback,
  useRef,
  useState,
} from 'react';
import * as Notifications from 'expo-notifications';
import * as Permissions from 'expo-permissions';
import Constants from 'expo-constants';
import { checkVersion } from 'react-native-check-version';

import { View } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { ThemeContext } from 'styled-components';
import { Modalize } from 'react-native-modalize';
import { differenceInDays } from 'date-fns/esm';
import Header from '../../../components/Header';

import { useTheme } from '../../../hooks/theme';
import { useAuth } from '../../../hooks/auth';
import { api } from '../../../services/api';
import { errorGeneric } from '../../../utils/errorMessages';
import rocketImage from '../../../assets/images/image.png';

import {
  Container,
  Name,
  Matricula,
  Rocket,
  Modal,
  ProgressContainer,
  ContentContainer,
  ModeContainer,
  ProgressBar,
  ProgressBox,
  ModeButton,
} from './styles';
import InfoHeader from '../../../components/InfoHeader';
import { useNotifications } from '../../../hooks/notifications';
import { useReward } from '../../../hooks/rewards';

const Home: React.FC = () => {
  const lastNotificationResponse = Notifications.useLastNotificationResponse();

  const { changelog } = useReward();
  const { navigate } = useNavigation();
  const { colors } = useContext(ThemeContext);
  const [percent, setPercent] = useState(0);
  const [loading, setLoading] = useState(true);
  const { token, updateUser, student, renew } = useAuth();
  const { getNotificationsInApp } = useNotifications();
  const { matricula } = student;
  const modalizeRef = useRef<Modalize>(null);

  const registerForPushNotificationsAsync = useCallback(async () => {
    if (Constants.isDevice) {
      const { status: existingStatus } = await Permissions.getAsync(
        Permissions.NOTIFICATIONS,
      );
      let finalStatus = existingStatus;
      if (existingStatus !== 'granted') {
        const { status } = await Permissions.askAsync(
          Permissions.NOTIFICATIONS,
        );
        finalStatus = status;
      }
      if (finalStatus !== 'granted') {
        return;
      }
      const pushtoken = await Notifications.getExpoPushTokenAsync();
      api.post(
        '/notifications',
        {
          pushtoken: pushtoken.data,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        },
      );
    }
  }, [token]);

  const handleCheckVersion = useCallback(async () => {
    const version = await checkVersion({
      bundleId: 'com.save.genp',
    });

    if (version.needsUpdate) {
      modalizeRef.current?.open();
    }
  }, []);

  useEffect(() => {
    registerForPushNotificationsAsync();
    handleCheckVersion();
    const totalDays = 199;
    const differenceDays = differenceInDays(new Date(2021, 3, 22), new Date());
    const realDifference = totalDays - differenceDays;
    const percent = Math.round((realDifference / totalDays) * 100);
    setPercent(percent);
    async function updateStudent(token: string) {
      setLoading(true);
      await api
        .get('/students/', {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then(response => {
          updateUser(response.data.student, response.data.student.token);
          getNotificationsInApp();
          setLoading(false);
        })
        .catch(() => {
          renew(matricula);
          setLoading(false);
        });
    }
    updateStudent(token);

    if (!changelog) {
      navigate('DarkReward');
    }
  }, [
    changelog,
    token,
    navigate,
    updateUser,
    renew,
    matricula,
    registerForPushNotificationsAsync,
    handleCheckVersion,
    getNotificationsInApp,
  ]);

  useEffect(() => {
    if (
      lastNotificationResponse &&
      lastNotificationResponse.notification.request.content.data.period &&
      lastNotificationResponse.notification.request.content.data.subject &&
      lastNotificationResponse.actionIdentifier ===
        Notifications.DEFAULT_ACTION_IDENTIFIER
    ) {
      navigate('Estudos', {
        periodNotification:
          lastNotificationResponse.notification.request.content.data.period,
        subjectNotification:
          lastNotificationResponse.notification.request.content.data.subject,
      });
    }
  }, [lastNotificationResponse, navigate]);

  return (
    <>
      <Modalize
        adjustToContentHeight
        ref={modalizeRef}
        snapPoint={190}
        handleStyle={{ backgroundColor: colors.boxFooter }}
        modalStyle={{ backgroundColor: colors.background }}
      >
        <Modal>
          <Name style={{ textAlign: 'center' }}>
            Uma atualização é necessária!
          </Name>
          <Matricula style={{ marginTop: 8, textAlign: 'center' }}>
            Algumas funcionalidades podem não funcionar como deveriam.
          </Matricula>
        </Modal>
      </Modalize>
      <Container>
        <Header title center page="Home" />

        {loading ? <InfoHeader loading /> : <InfoHeader />}
        <ContentContainer>
          {!loading && (
            <ProgressContainer>
              <ModeContainer>
                <Name style={{ textAlign: 'left' }}>Progresso Anual</Name>
                <Matricula style={{ textAlign: 'left' }}>
                  100% completo
                </Matricula>
              </ModeContainer>
              <ProgressBox>
                <ProgressBar progress={100} />
              </ProgressBox>
            </ProgressContainer>
          )}
          {/*
          {!loading && (
            <ModeContainer>
              <Name>Iniciar modo Foco</Name>
              <Matricula style={{ textAlign: 'left' }}>
                Técnica de Pomodoro
              </Matricula>
              <ModeButton>
                <Feather
                  name="arrow-right-circle"
                  size={28}
                  color={colors.buttonText}
                />
              </ModeButton>
            </ModeContainer>
            )
          }
          */}
          {loading ? (
            <Name style={{ marginTop: '50%' }}>Carregando...</Name>
          ) : (
            <Rocket source={rocketImage} style={{ resizeMode: 'contain' }} />
          )}
        </ContentContainer>
      </Container>
    </>
  );
};

export default Home;
