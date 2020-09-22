import React, { useContext } from 'react';
import { ActivityIndicator } from 'react-native';
import { RectButtonProperties } from 'react-native-gesture-handler';
import { ThemeContext } from 'styled-components';
import { Container, ButtonText } from './styles';

interface ButtonProps extends RectButtonProperties {
  children: string;
  redButton?: boolean;
  loading?: boolean;
}

const Button: React.FC<ButtonProps> = ({
  redButton = false,
  children,
  loading = false,
  ...rest
}) => {
  const { colors } = useContext(ThemeContext);

  return (
    <Container red={redButton} {...rest}>
      {loading ? (
        <ActivityIndicator size="large" color={colors.buttonText} />
      ) : (
        <ButtonText>{children}</ButtonText>
      )}
    </Container>
  );
};

export default Button;
