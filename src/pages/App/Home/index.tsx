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

const Home: React.FC = () => {
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
          updateUser(response.data.student, token);
          getNotificationsInApp();
          setLoading(false);
        })
        .catch(err => {
          setLoading(false);
          if (err.response.status === 401) {
            renew();
          } else {
            errorGeneric(err.response.data.message);
          }
        });
    }
    updateStudent(token);
  }, [
    token,
    updateUser,
    renew,
    matricula,
    registerForPushNotificationsAsync,
    handleCheckVersion,
    getNotificationsInApp,
  ]);

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
                  {percent}% completo
                </Matricula>
              </ModeContainer>
              <ProgressBox>
                <ProgressBar progress={percent} />
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
