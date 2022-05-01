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

import landingImage from '../../../assets/images/mockup.png';
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
          <TitleBold>Estamos de mudança!</TitleBold>
        </Title>
      </ActionContainer>
    </>
  );
};

export default Landing;
