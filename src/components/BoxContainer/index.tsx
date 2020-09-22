import React from 'react';

import { BoxBase } from './styles';

const BoxContainer: React.FC = ({ children }) => {
  return <BoxBase>{children}</BoxBase>;
};

export default BoxContainer;
