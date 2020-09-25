import React, { useState, useRef, useCallback } from 'react';
import { KeyboardAvoidingView, Platform } from 'react-native';

import { useNavigation } from '@react-navigation/native';
import * as Yup from 'yup';
import { FormHandles } from '@unform/core';
import { Form } from '@unform/mobile';
import { useAuth } from '../../../../hooks/auth';
import { classes } from '../../../../utils/classArrayPicker';
import { updatedError, updatedSuccess } from '../../../../utils/errorMessages';
import getValidationErrors from '../../../../utils/getValidationErrors';
import { api } from '../../../../services/api';

import Header from '../../../../components/Header';
import Picker from '../../../../components/Picker';
import InfoInput from '../../../../components/InfoInput';
import Button from '../../../../components/Button';
import Box from '../../../../components/BoxContainer';
import Title from '../../../../components/Title';
import DimissKeyboard from '../../../../components/DimissKeyboard';

import { Container, Content, Footer } from './styles';

interface FormObject {
  emailPessoal: string;
}

const UpdateProfile: React.FC = () => {
  const { student, updateUser, token } = useAuth();
  const { email, campus, turma } = student;
  const [selectedClass, setSelectedClass] = useState(turma);
  const formRef = useRef<FormHandles>(null);
  const { navigate } = useNavigation();

  const handleUpdate = useCallback(
    async (data: FormObject) => {
      const { emailPessoal } = data;

      if (!emailPessoal && !selectedClass) {
        updatedError();
        return;
      }

      const updateData = {
        emailPessoal,
        turma: selectedClass,
      };

      try {
        formRef.current?.setErrors({});

        const schema = Yup.object().shape({
          emailPessoal: Yup.string().email().nullable(),
          turma: Yup.string().nullable(),
        });

        await schema.validate(updateData, {
          abortEarly: false,
        });

        const response = await api.put(
          'students/profile',
          {
            email: emailPessoal,
            turma: selectedClass,
          },
          {
            headers: { Authorization: `Bearer ${token}` },
          },
        );

        updatedSuccess();
        updateUser(response.data);
        navigate('Perfil');
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          getValidationErrors(err);
        }
        updatedError();
      }
    },
    [updateUser, token, selectedClass, navigate],
  );

  return (
    <DimissKeyboard>
      <Container>
        <Header back screenName="Perfil" />
        <Title>Editar Perfil</Title>
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'position'}
          enabled
        >
          <Box>
            <Content>
              <Form ref={formRef} onSubmit={handleUpdate}>
                {email ? (
                  <InfoInput
                    autoCorrect={false}
                    autoCapitalize="none"
                    keyboardType="email-address"
                    defaultValue={email}
                    title="EMAIL"
                    name="emailPessoal"
                  />
                ) : (
                  <InfoInput
                    autoCorrect={false}
                    autoCapitalize="none"
                    keyboardType="email-address"
                    placeholder="Atualize seu perfil"
                    placeholderTextColor="#E33D3D"
                    title="EMAIL"
                    name="emailPessoal"
                    error
                  />
                )}
              </Form>
              {campus === 'PAR' ? (
                turma ? (
                  <Picker
                    titleInfo="TURMA"
                    placeholderLabel="Atualize seu perfil"
                    itemKey={student.turma}
                    items={classes}
                    onValueChange={value => setSelectedClass(value)}
                  />
                ) : (
                  <Picker
                    pickerError
                    titleInfo="TURMA"
                    placeholderLabel="Atualize seu perfil"
                    itemKey={student.turma}
                    items={classes}
                    onValueChange={value => setSelectedClass(value)}
                  />
                )
              ) : undefined}

              <Footer>
                <Button
                  style={{ marginTop: 0 }}
                  onPress={() => {
                    formRef.current?.submitForm();
                  }}
                >
                  ATUALIZAR
                </Button>
              </Footer>
            </Content>
          </Box>
        </KeyboardAvoidingView>
      </Container>
    </DimissKeyboard>
  );
};

export default UpdateProfile;
