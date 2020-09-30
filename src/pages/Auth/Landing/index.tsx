import React from 'react';
import { Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import {
  ActionContainer,
  Container,
  Banner,
  Title,
  TitleBold,
  ButtonsContainer,
  Button,
  ButtonSecondary,
  ButtonText,
} from './styles';

import landingImage from '../../../assets/images/landing-background.png';
import studyIcon from '../../../assets/images/icons/study.png';
import faqIcon from '../../../assets/images/icons/faq.png';

const Landing: React.FC = () => {
  const { navigate } = useNavigation();

  function handleNavigateToLoginPage() {
    navigate('Login');
  }

  function handleNavigateToFaq() {
    navigate('Faq');
  }

  return (
    <>
      <Container>
        <Banner source={landingImage} style={{ resizeMode: 'contain' }} />
      </Container>

      <ActionContainer>
        <Title>
          Seja bem vindo,
          {'\n'}
          <TitleBold>O que deseja fazer?</TitleBold>
        </Title>

        <ButtonsContainer>
          <Button onPress={handleNavigateToFaq}>
            <Image source={faqIcon} />

            <ButtonText>Políticas</ButtonText>
          </Button>
          <ButtonSecondary onPress={handleNavigateToLoginPage}>
            <Image source={studyIcon} />

            <ButtonText>Acessar</ButtonText>
          </ButtonSecondary>
        </ButtonsContainer>
      </ActionContainer>
    </>
  );
};

export default Landing;
