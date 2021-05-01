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
  SmallTitle,
  InfoTitle,
  Footer,
  Details,
  DetailGrey,
  DetailYellow,
} from './styles';

import darkImage from '../../../assets/images/darktheme.png';
import arrowIcon from '../../../assets/images/icons/next.png';
import { useReward } from '../../../hooks/rewards';

const DarkReward: React.FC = () => {
  const { goBack } = useNavigation();
  const { activeChangelog } = useReward();

  function handleGoBack() {
    goBack();
    activeChangelog();
  }

  return (
    <>
      <Container>
        <Banner source={darkImage} style={{ resizeMode: 'contain' }} />
      </Container>

      <ActionContainer>
        <InfoTitle>Wooww!</InfoTitle>
        <Title>Novas funcionalidades:</Title>
        <SmallTitle>
          - Ao apertar em uma notificação escolar ela te levará ao boletim!
        </SmallTitle>
        <SmallTitle>
          - Agora você pode criar tickets e sugestões na aba perfil!
        </SmallTitle>
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
