import React, { useCallback, useEffect, useState, useRef } from 'react';

import { FormHandles } from '@unform/core';
import { Form } from '@unform/mobile';
import Header from '../../../components/Header';
import Title from '../../../components/Title';
import BoxContainer from '../../../components/BoxContainer';
import Button from '../../../components/Button';
import InfoInput from '../../../components/InfoInput';
import { api } from '../../../services/api';
import { useAuth } from '../../../hooks/auth';

import { notifySuccess, errorGeneric } from '../../../utils/errorMessages';

import { Container, Text, Line, TotalBox, Notification } from './styles';

interface FormObject {
  title: string;
  body: string;
  turma: string | null;
  campus: string | null;
  matricula: string | null;
}

const Admin: React.FC = () => {
  const [totalStudents, setTotal] = useState('');
  const formRef = useRef<FormHandles>(null);
  const { token } = useAuth();

  const handleGetUsers = useCallback(async () => {
    const response = await api.get('/students/profiles', {
      headers: { Authorization: `Bearer ${token}` },
    });

    const [, total] = response.data;

    setTotal(total);
  }, [token]);

  const handleSendNotification = useCallback(
    async (data: FormObject) => {
      const response = await api
        .post(
          '/notifications/send',
          {
            title: data.title,
            body: data.body,
            turma: data.turma,
            campus: data.campus,
            matricula: data.matricula,
          },
          { headers: { Authorization: `Bearer ${token}` } },
        )
        .then(() => {
          notifySuccess();
        })
        .catch(err => {
          errorGeneric(err);
        });
    },
    [token],
  );

  useEffect(() => {
    handleGetUsers();
  }, [handleGetUsers]);

  return (
    <>
      <Container>
        <Header center page="Admin" />
        <Title>Painel Admin</Title>
        <BoxContainer>
          <TotalBox>
            <Text>{totalStudents} Estudantes cadastrados.</Text>
          </TotalBox>
          <Line />
          <Notification>
            <Text>Enviar Notificação</Text>
            <Form ref={formRef} onSubmit={handleSendNotification}>
              <InfoInput keyboardType="default" title="TITULO" name="title" />
              <InfoInput keyboardType="default" title="CORPO" name="body" />
              <InfoInput
                keyboardType="default"
                title="CAMPUS (opcional)"
                name="campus"
              />
              <InfoInput
                autoCorrect={false}
                autoCapitalize="none"
                keyboardType="default"
                title="TURMA (opcional)"
                name="turma"
              />
              <InfoInput
                keyboardType="default"
                title="MATRICULA (opcional)"
                name="matricula"
              />
            </Form>
            <Button
              style={{ marginTop: 0 }}
              onPress={() => {
                formRef.current?.submitForm();
              }}
            >
              ENVIAR
            </Button>
          </Notification>
        </BoxContainer>
      </Container>
    </>
  );
};

export default Admin;
