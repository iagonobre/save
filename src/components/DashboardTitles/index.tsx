import React from 'react';

import { Container, Title, Subtitle } from './styles';

interface DashBoardProps {
  subtitle?: string;
}

const DashboardTitles: React.FC<DashBoardProps> = ({ children, subtitle }) => {
  return (
    <Container>
      <Title>{children}</Title>
      <Subtitle>{subtitle}</Subtitle>
    </Container>
  );
};

export default DashboardTitles;
