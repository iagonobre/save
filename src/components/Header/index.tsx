import React from 'react';
import { BorderlessButton } from 'react-native-gesture-handler';
import { Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Container, TopBar, Text } from './styles';

import backIcon from '../../assets/images/icons/back.png';

interface HeaderProps {
  back?: boolean;
  title?: boolean;
  page?: string;
  center?: boolean;
  screenName?: string;
  report?: boolean;
}

const Header: React.FC<HeaderProps> = ({
  back = false,
  center = false,
  report = false,
  page,
  screenName,
}) => {
  const { navigate } = useNavigation();

  function handleNavigateToScreen() {
    navigate(`${screenName}`);
  }

  return (
    <Container>
      <TopBar isTitlePage={center}>
        {back ? (
          <BorderlessButton
            style={{
              width: 48,
              height: 48,
              alignItems: 'center',
              justifyContent: 'center',
            }}
            onPress={handleNavigateToScreen}
          >
            <Image source={backIcon} resizeMode="contain" />
          </BorderlessButton>
        ) : undefined}
        {page ? <Text>{page}</Text> : undefined}
      </TopBar>
    </Container>
  );
};

export default Header;
