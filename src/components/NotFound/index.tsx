import React from 'react';

import ovniImage from '../../assets/images/nave.png';
import { SearchContainer, SearchTitle, SearchSubtitle, Banner } from './styles';

interface NotFoundProps {
  message: string;
  submessage: string;
}

const NotFound: React.FC<NotFoundProps> = ({ message, submessage }) => {
  return (
    <SearchContainer>
      <SearchTitle>{message}</SearchTitle>
      <SearchSubtitle>{submessage}</SearchSubtitle>
      <Banner source={ovniImage} style={{ resizeMode: 'contain' }} />
    </SearchContainer>
  );
};

export default NotFound;
