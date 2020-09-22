import React from 'react';
import { Image, Linking } from 'react-native';
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
  TotalConnections,
} from './styles';

import faqImage from '../../../assets/images/faqimage.png';
import voltarIcon from '../../../assets/images/icons/voltar.png';
import siteIcon from '../../../assets/images/icons/site.png';

const Faq: React.FC = () => {
  const { goBack } = useNavigation();
  const url = 'https://moralesave.me/faq';

  function handleNavigateToFaq() {
    Linking.openURL(url);
  }

  function handleGoBack() {
    goBack();
  }

  return (
    <>
      <Container>
        <Banner source={faqImage} style={{ resizeMode: 'contain' }} />
      </Container>

      <ActionContainer>
        <Title>
          Para acessar o nosso FAQ
          {'\n'}
          <TitleBold>Visite o nosso site:</TitleBold>
        </Title>

        <ButtonsContainer>
          <Button onPress={handleNavigateToFaq}>
            <Image source={siteIcon} />

            <ButtonText>Ir ao site</ButtonText>
          </Button>
          <ButtonSecondary onPress={handleGoBack}>
            <Image source={voltarIcon} />
            <ButtonText>Voltar</ButtonText>
          </ButtonSecondary>
        </ButtonsContainer>
        <TotalConnections>
          Feito por: Genp {'\n'}IFRN Parnamirim
        </TotalConnections>
      </ActionContainer>
    </>
  );
};

export default Faq;
