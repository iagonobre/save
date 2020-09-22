import React from 'react';
import { TextProperties } from 'react-native';
import { TitleContainer, Title, BoxAvatar, Avatar } from './styles';
import { useAuth } from '../../hooks/auth';

interface TitleProps extends TextProperties {
  children?: string | string[];
  avatar?: boolean;
}

const Header: React.FC<TitleProps> = ({ children, avatar = false }) => {
  const { student } = useAuth();
  const { avatarSaveURL, avatarSuap } = student;
  const avatarSuapURL = `https://suap.ifrn.edu.br${avatarSuap}`;
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
      ) : (
        <Title>{children}</Title>
      )}
    </TitleContainer>
  );
};

export default Header;
