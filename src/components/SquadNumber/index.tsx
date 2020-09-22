import React from 'react';

import { Container, SquadNote, Note, SquadInfo } from './styles';

interface SquadProps {
  number?: number;
  info: string;
  redColor?: boolean;
}

const SquadNumber: React.FC<SquadProps> = ({
  number,
  info,
  redColor = false,
}) => {
  return (
    <Container>
      <SquadNote>
        {number && number < 60 ? (
          <Note redColor>{number || '-'}</Note>
        ) : (
          <Note redColor={redColor}>{number || '-'}</Note>
        )}
      </SquadNote>
      {number && number < 60 ? (
        <SquadInfo redColor>{info}</SquadInfo>
      ) : (
        <SquadInfo redColor={redColor}>{info}</SquadInfo>
      )}
    </Container>
  );
};

export default SquadNumber;
