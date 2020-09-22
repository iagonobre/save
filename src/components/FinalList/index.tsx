import React from 'react';
import rocketImage from '../../assets/images/rocketMateriais.png';

import {
  FooterContainer,
  Banner,
  TextFooter,
  SearchTitle,
  SearchSubtitle,
} from './styles';

const FinalList: React.FC = () => {
  return (
    <FooterContainer>
      <Banner source={rocketImage} style={{ resizeMode: 'contain' }} />
      <TextFooter>
        <SearchTitle>Isso é tudo!</SearchTitle>
        <SearchSubtitle>Aguente firme, astronauta.</SearchSubtitle>
      </TextFooter>
    </FooterContainer>
  );
};

export default FinalList;
