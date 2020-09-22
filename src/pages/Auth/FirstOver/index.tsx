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

import firstImage from '../../../assets/images/firstover.png';
import arrowIcon from '../../../assets/images/icons/next.png';

const DarkReward: React.FC = () => {
  const { navigate } = useNavigation();

  function handleNavigateToSecond() {
    navigate('SecondOver');
  }

  return (
    <>
      <Container>
        <Banner source={firstImage} style={{ resizeMode: 'contain' }} />
      </Container>

      <ActionContainer>
        <InfoTitle>01.</InfoTitle>
        <Title>
          Tenha o <TitleBold>SUAP</TitleBold> simples{'\n'}e descomplicado{'\n'}
          em suas mãos.
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
            onPress={handleNavigateToSecond}
          >
            <Image source={arrowIcon} />
          </BorderlessButton>
        </Footer>
      </ActionContainer>
    </>
  );
};

export default DarkReward;
