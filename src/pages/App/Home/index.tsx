import React, { useEffect, useContext, useState, useCallback } from 'react';
import { differenceInDays } from 'date-fns';
import * as Notifications from 'expo-notifications';
import * as Permissions from 'expo-permissions';
import Constants from 'expo-constants';

import { Share } from 'react-native';
import { Feather } from '@expo/vector-icons';
import * as Progress from 'react-native-progress';
import { useNavigation } from '@react-navigation/native';
import { ThemeContext } from 'styled-components';
import SkeletonContent from 'react-native-skeleton-content';
import Header from '../../../components/Header';

import { useTheme } from '../../../hooks/theme';
import { useAuth } from '../../../hooks/auth';
import { useReward } from '../../../hooks/rewards';
import { api } from '../../../services/api';
import { errorGeneric } from '../../../utils/errorMessages';
import rocketImage from '../../../assets/images/rocketsave.png';

import {
  Container,
  InfoHeader,
  Line,
  ShareButton,
  PerfilContainer,
  InfoBox,
  Name,
  Matricula,
  Avatar,
  AvatarBorder,
  ProgressContainer,
  Text,
  Rocket,
  ContentContainer,
} from './styles';

interface SkeletonColors {
  colors: {
    highlight: string;
    boner: string;
  };
}

const Home: React.FC = () => {
  const { colors } = useContext(ThemeContext);
  const { theme } = useTheme();
  const [progress, setProgress] = useState(0);
  const [loading, setLoading] = useState(true);
  const { token, updateUser, signOut, student, renew } = useAuth();
  const { darkReward, activeDarkReward } = useReward();
  const { navigate } = useNavigation();
  const { avatarSuap, avatarSaveURL, nomeUsual, matricula } = student;
  const avatarSuapURL = `https://suap.ifrn.edu.br${avatarSuap}`;

  const handleNavigateToPerfil = useCallback(() => {
    navigate('Perfil');
  }, [navigate]);

  const handleShareApp = useCallback(() => {
    Share.share({
      message: `Olá, aluno do IFRN! Já imaginou ter o SUAP simples e descomplicado em suas mãos? Conheça o Save, o Assistente Virtual que decola seus estudos! Consultar o SUAP nunca foi tão fácil. Não deixe de conferir!${'\n'}${'\n'}GooglePlay: https://bit.ly/3cbZjyl${'\n'}AppStore: Em Breve.`,
    });
    if (!darkReward) {
      activeDarkReward();
      setTimeout(() => navigate('DarkReward'), 1000);
    }
  }, [activeDarkReward, darkReward, navigate]);

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

  const handleGetProgress = useCallback(() => {
    const progressDays = differenceInDays(
      new Date(2021, 4, 13, 0, 0),
      new Date(2020, 9, 21, 0, 0),
    );
    const atualDays = differenceInDays(new Date(2021, 4, 13, 0, 0), new Date());

    if (atualDays >= progressDays) {
      return setProgress(0);
    }

    const diferenceDays = progressDays - atualDays;
    const progressDecimal = diferenceDays / progressDays;

    return setProgress(progressDecimal);
  }, []);

  useEffect(() => {
    registerForPushNotificationsAsync();
    handleGetProgress();
    async function updateStudent(token: string) {
      setLoading(true);
      await api
        .get('/students/profile', {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then(response => {
          updateUser(response.data);
          setLoading(false);
        })
        .catch(err => {
          setLoading(false);
          if (err.response.status === 401) {
            renew(matricula);
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
    handleGetProgress,
    registerForPushNotificationsAsync,
  ]);

  return (
    <Container>
      <Header title center page="Home" />
      <InfoHeader>
        {loading ? (
          <SkeletonContent
            boneColor={
              theme.title === 'light' ? colors.primary : colors.background
            }
            highlightColor={
              theme.title === 'light' ? colors.primaryLight : colors.background
            }
            containerStyle={{ flex: 1 }}
            isLoading
            layout={[
              {
                key: 'button',
                width: 41,
                height: 41,
                borderRadius: 8,
              },
            ]}
          />
        ) : (
          <ShareButton onPress={handleShareApp}>
            <Feather name="share-2" size={28} color={colors.backgroundPurple} />
          </ShareButton>
        )}

        <PerfilContainer>
          <InfoBox>
            {loading ? (
              <SkeletonContent
                boneColor={
                  theme.title === 'light' ? colors.primary : colors.background
                }
                highlightColor={
                  theme.title === 'light'
                    ? colors.primaryLight
                    : colors.background
                }
                containerStyle={{
                  flex: 1,
                  justifyContent: 'center',
                }}
                isLoading
                layout={[
                  {
                    key: 'name',
                    width: 150,
                    height: 16,
                  },
                ]}
              />
            ) : (
              <Name>{nomeUsual}</Name>
            )}

            {loading ? (
              <SkeletonContent
                boneColor={
                  theme.title === 'light' ? colors.primary : colors.background
                }
                highlightColor={
                  theme.title === 'light'
                    ? colors.primaryLight
                    : colors.background
                }
                containerStyle={{
                  flex: 1,
                  alignItems: 'flex-end',
                }}
                isLoading
                layout={[
                  {
                    key: 'matricula',
                    width: 80,
                    height: 12,
                  },
                ]}
              />
            ) : (
              <Matricula>{matricula}</Matricula>
            )}
          </InfoBox>
          <AvatarBorder onPress={handleNavigateToPerfil}>
            {loading ? (
              <SkeletonContent
                boneColor={
                  theme.title === 'light' ? colors.primary : colors.background
                }
                highlightColor={
                  theme.title === 'light'
                    ? colors.primaryLight
                    : colors.background
                }
                containerStyle={{
                  flex: 1,
                  justifyContent: 'center',
                }}
                isLoading
                layout={[
                  {
                    key: 'avatar',
                    width: 52,
                    height: 52,
                    borderRadius: 26,
                  },
                ]}
              />
            ) : (
              <Avatar
                source={{
                  uri: `${avatarSaveURL || avatarSuapURL}`,
                }}
              />
            )}
          </AvatarBorder>
        </PerfilContainer>
      </InfoHeader>
      <Line />
      {loading ? undefined : <Text>Bem-vindo{'\n'}ao Save!</Text>}
      <ContentContainer>
        {loading ? (
          <Name style={{ marginTop: '50%' }}>Carregando...</Name>
        ) : (
          <Rocket source={rocketImage} resizeMode="contain" />
        )}
        {loading ? undefined : (
          <ProgressContainer>
            <Progress.Bar progress={progress} width={328} color="#E9BF52" />
            <Matricula>
              Progresso Anual - {Math.round(progress * 100)}%
            </Matricula>
          </ProgressContainer>
        )}
      </ContentContainer>
    </Container>
  );
};

export default Home;
