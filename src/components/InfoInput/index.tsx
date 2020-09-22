import React, { useEffect, useRef } from 'react';

import { useField } from '@unform/core';
import { TextInputProps } from 'react-native';
import { Container, InputInfo } from './styles';

interface InfoInputProps extends TextInputProps {
  name: string;
  title?: string;
  error?: boolean;
}

interface InputValueReference {
  value: string;
}

const InfoInput: React.FC<InfoInputProps> = ({
  name,
  title,
  error = false,
  ...rest
}) => {
  const inputElementRef = useRef<any>(null);

  const { registerField, defaultValue = '', fieldName } = useField(name);
  const inputValueRef = useRef<InputValueReference>({ value: defaultValue });

  useEffect(() => {
    registerField<string>({
      name: fieldName,
      ref: inputValueRef.current,
      path: 'value',
      setValue(ref: any, value) {
        inputValueRef.current.value = value;
        inputElementRef.current.setNativeProps({ text: value });
      },
      clearValue() {
        inputValueRef.current.value = '';
        inputElementRef.current.clear();
      },
    });
  }, [fieldName, registerField]);

  return (
    <>
      <InputInfo isErrored={error}>{title}</InputInfo>
      <Container
        ref={inputElementRef}
        onChangeText={value => {
          inputValueRef.current.value = value;
        }}
        defaultValue={defaultValue}
        isErrored={error}
        {...rest}
      />
    </>
  );
};

export default InfoInput;
