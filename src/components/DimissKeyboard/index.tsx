import React from 'react';
import { TouchableWithoutFeedback, Keyboard } from 'react-native';

const DimissKeyboard: React.FC = ({ children }) => {
  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      {children}
    </TouchableWithoutFeedback>
  );
};

export default DimissKeyboard;
