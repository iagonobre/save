import React, { useCallback, useContext } from 'react';

import { Share } from 'react-native';
import SkeletonContent from 'react-native-skeleton-content';
import { Feather, Ionicons } from '@expo/vector-icons';
import { ThemeContext } from 'styled-components';
import { useNavigation } from '@react-navigation/native';
import { useTheme } from '../../hooks/theme';
import { useAuth } from '../../hooks/auth';

import {
  InfoHeaderContainer,
  ShareButton,
  PerfilContainer,
  InfoBox,
  ActionsButton,
  NotifyCircle,
  Avatar,
  AvatarBorder,
  Matricula,
  Name,
} from './styles';
import { useNotifications } from '../../hooks/notifications';

interface InfoHeaderProps {
  loading?: boolean;
}

const InfoHeader: React.FC<InfoHeaderProps> = ({ loading = false }) => {
  const { colors } = useContext(ThemeContext);
  const { theme } = useTheme();
  const { student } = useAuth();
  const { circle, resetCircle } = useNotifications();
  const { avatarSuap, avatarSaveURL, nomeUsual, matricula } = student;
  const avatarSuapURL = `https://suap.ifrn.edu.br${avatarSuap}`;

  const { navigate } = useNavigation();

  const handleNavigateToPerfil = useCallback(() => {
    navigate('Perfil');
  }, [navigate]);

  const handleNavigateToNotifications = useCallback(() => {
    resetCircle();
    navigate('Notifications');
  }, [navigate]);

  const handleShareApp = useCallback(() => {
    Share.share({
      message: `Olá, aluno do IFRN! Já imaginou ter o SUAP simples e descomplicado em suas mãos? Conheça o Save, o Assistente Virtual que decola seus estudos! Consultar o SUAP nunca foi tão fácil. Não deixe de conferir!${'\n'}${'\n'}GooglePlay: https://bit.ly/save_android${'\n'}AppStore: Em Breve.`,
    });
  }, []);

  return (
    <InfoHeaderContainer>
      {loading ? (
        <SkeletonContent
          boneColor={
            theme.title === 'light' ? colors.primary : colors.background
          }
          highlightColor={
            theme.title === 'light' ? colors.primaryLight : colors.background
          }
          containerStyle={{ flex: 1, flexDirection: 'row' }}
          isLoading
          layout={[
            {
              key: 'button',
              width: 41,
              height: 41,
              borderRadius: 8,
            },
            {
              key: 'button2',
              width: 41,
              height: 41,
              borderRadius: 8,
              marginLeft: 12,
            },
          ]}
        />
      ) : (
        <ActionsButton>
          <ShareButton onPress={handleShareApp}>
            <Ionicons
              name="md-share-social-outline"
              size={29}
              color={colors.backgroundPurple}
            />
          </ShareButton>
          <ShareButton
            style={{ marginLeft: 12 }}
            onPress={handleNavigateToNotifications}
          >
            {circle && <NotifyCircle />}
            <Feather name="bell" size={28} color={colors.backgroundPurple} />
          </ShareButton>
        </ActionsButton>
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
                  width: 110,
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
    </InfoHeaderContainer>
  );
};

export default InfoHeader;
