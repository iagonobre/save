import React, { useContext } from 'react';
import { ThemeContext } from 'styled-components';
import { Feather } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import {
  TitleContainer,
  Title,
  BoxAvatar,
  Avatar,
  ShareButton,
  Circle,
  ReportContainer,
} from './styles';
import { useAuth } from '../../hooks/auth';

interface TitleProps {
  children?: string | string[];
  avatar?: boolean;
  report?: boolean;
}

const Header: React.FC<TitleProps> = ({
  children,
  report = false,
  avatar = false,
}) => {
  const { student } = useAuth();
  const { navigate } = useNavigation();
  const { colors } = useContext(ThemeContext);

  const { avatarSaveURL, avatarSuap } = student;
  const avatarSuapURL = `https://suap.ifrn.edu.br${avatarSuap}`;

  function handleNavigateToReport() {
    navigate('Report');
  }

  return (
    <TitleContainer>
      {avatar ? (
        <BoxAvatar>
          <Title style={{ marginBottom: 0 }}>{children}</Title>
          <Avatar
            source={{
              uri: `${avatarSaveURL || avatarSuapURL}`,
            }}
          />
        </BoxAvatar>
      ) : report ? (
        <ReportContainer>
          <Title>{children}</Title>
          <ShareButton onPress={handleNavigateToReport}>
            <Circle />
            <Feather name="flag" size={28} color={colors.backgroundPurple} />
          </ShareButton>
        </ReportContainer>
      ) : (
        <Title>{children}</Title>
      )}
    </TitleContainer>
  );
};

export default Header;
