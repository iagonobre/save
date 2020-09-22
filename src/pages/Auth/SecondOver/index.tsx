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

import { useReward } from '../../../hooks/rewards';

import secondImage from '../../../assets/images/secondover.png';
import arrowIcon from '../../../assets/images/icons/next.png';

const DarkReward: React.FC = () => {
  const { activeFirstTime } = useReward();
  const { navigate } = useNavigation();

  function handleNavigateToLanding() {
    activeFirstTime();
    navigate('Landing');
  }

  return (
    <>
      <Container>
        <Banner source={secondImage} style={{ resizeMode: 'contain' }} />
      </Container>

      <ActionContainer>
        <InfoTitle>02.</InfoTitle>
        <Title>
          Acessar os <TitleBold>materiais</TitleBold>
          {'\n'}de aula nunca
          {'\n'}foi tão fácil.
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
            onPress={handleNavigateToLanding}
          >
            <Image source={arrowIcon} />
          </BorderlessButton>
        </Footer>
      </ActionContainer>
    </>
  );
};

export default DarkReward;
