import React from 'react';

import { Container, Content, Header, TextHeader } from './styles';

interface DashboardProps {
  header: string;
  error?: boolean;
  height?: number;
  alignCenter?: boolean;
}

const DashboardBox: React.FC<DashboardProps> = ({
  header,
  children,
  alignCenter = false,
  error = false,
  height,
  ...rest
}) => {
  return (
    <Container>
      <Header isErrored={error}>
        <TextHeader isErrored={error} numberOfLines={1}>
          {header}
        </TextHeader>
      </Header>
      <Content
        height={height}
        isErrored={error}
        alignCenter={alignCenter}
        {...rest}
      >
        {children}
      </Content>
    </Container>
  );
};

export default DashboardBox;
