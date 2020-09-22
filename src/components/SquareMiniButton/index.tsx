import React, { useContext } from 'react';
import { Feather } from '@expo/vector-icons';
import { ThemeContext } from 'styled-components';

import { TouchableOpacityProps } from 'react-native';

import { RectBox, Box, TextBox } from './styles';

interface SquareMiniButtonProps extends TouchableOpacityProps {
  icon: string;
  text: string;
  currentPage: string;
}

const SquareMiniButton: React.FC<SquareMiniButtonProps> = ({
  icon,
  text,
  currentPage,
  ...rest
}) => {
  const { colors } = useContext(ThemeContext);

  return (
    <RectBox>
      {currentPage === text ? (
        <Box selected {...rest}>
          <Feather name={icon} size={24} color={colors.boxBase} />
        </Box>
      ) : (
        <Box {...rest}>
          <Feather name={icon} size={24} color={colors.boxBase} />
        </Box>
      )}
      <TextBox>{text}</TextBox>
    </RectBox>
  );
};

export default SquareMiniButton;
