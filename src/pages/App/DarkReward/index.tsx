import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { BorderlessButton } from 'react-native-gesture-handler';
import { Image } from 'react-native';
import {
  ActionContainer,
  Container,
  Banner,
  Title,
  TitleBold,
  InfoTitle,
  Footer,
  Details,
  DetailGrey,
  DetailYellow,
} from './styles';

import darkImage from '../../../assets/images/darktheme.png';
import arrowIcon from '../../../assets/images/icons/next.png';

const DarkReward: React.FC = () => {
  const { goBack } = useNavigation();

  function handleGoBack() {
    goBack();
  }

  return (
    <>
      <Container>
        <Banner source={darkImage} style={{ resizeMode: 'contain' }} />
      </Container>

      <ActionContainer>
        <InfoTitle>Wooww!</InfoTitle>
        <Title>
          Você ganhou um prêmio!{'\n'}Mude o tema do <TitleBold>Save</TitleBold>{' '}
          na{'\n'}aba Perfil.
        </Title>
        <Footer>
          <Details>
            <DetailGrey />
            <DetailYellow />
          </Details>
          <BorderlessButton
            style={{
              width: 80,
              height: 80,
              alignItems: 'center',
              justifyContent: 'center',
            }}
            onPress={handleGoBack}
          >
            <Image source={arrowIcon} />
          </BorderlessButton>
        </Footer>
      </ActionContainer>
    </>
  );
};

export default DarkReward;
