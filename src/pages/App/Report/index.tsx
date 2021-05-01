import React, { useCallback, useState, useRef } from 'react';

import { FormHandles } from '@unform/core';
import { Form } from '@unform/mobile';
import Header from '../../../components/Header';
import Title from '../../../components/Title';
import BoxContainer from '../../../components/BoxContainer';
import Button from '../../../components/Button';
import InfoInput from '../../../components/InfoInput';
import { api } from '../../../services/api';
import { useAuth } from '../../../hooks/auth';

import { ticketSucess, errorGeneric } from '../../../utils/errorMessages';

import {
  Container,
  InputInfo,
  Line,
  SmallText,
  TotalBox,
  Notification,
} from './styles';
import Picker from '../../../components/Picker';

interface FormObject {
  title: string;
  body: string;
  turma: string | null;
  campus: string | null;
  matricula: string | null;
}

const Report: React.FC = () => {
  const [category, setCategory] = useState('');

  const formRef = useRef<FormHandles>(null);
  const { token } = useAuth();

  const handleCreateTicket = useCallback(
    async (data: FormObject) => {
      await api
        .post(
          '/tickets',
          {
            category,
            title: data.title,
            body: data.body,
          },
          { headers: { Authorization: `Bearer ${token}` } },
        )
        .then(() => {
          ticketSucess();
        })
        .catch(err => {
          errorGeneric(err.response.data.message);
        });
    },
    [token, category],
  );

  return (
    <>
      <Container>
        <Header back screenName="Perfil" />
        <Title>Tickets e Sugestões</Title>
        <BoxContainer>
          <TotalBox>
            <Picker
              placeholderLabel="Selecione uma categoria"
              titleInfo="Categoria"
              items={[
                { label: 'Sugestão', value: 'sugestao', key: 'sugestao' },
                { label: 'Problema ou Erro', value: 'erro', key: 'erro' },
                { label: 'Reclamação', value: 'reclamacao', key: 'reclamacao' },
                { label: 'Outros', value: 'outros', key: 'outros' },
              ]}
              onValueChange={value => setCategory(value)}
            />
          </TotalBox>
          <Line />
          <Notification>
            <Form ref={formRef} onSubmit={handleCreateTicket}>
              <InfoInput
                style={{ width: '100%', marginLeft: 0 }}
                keyboardType="default"
                title="TITULO"
                name="title"
              >
                <InputInfo>TITULO</InputInfo>
              </InfoInput>
              <InfoInput
                multiline
                style={{ width: '100%', height: 120, marginLeft: 0 }}
                keyboardType="default"
                title="CORPO"
                name="body"
              >
                <InputInfo>DESCRIÇÃO</InputInfo>
              </InfoInput>
            </Form>
            <SmallText>
              Caso o ticket necessite de uma resposta, ela será enviada ao seu
              e-mail.
            </SmallText>
            <Button
              style={{ marginTop: 0 }}
              onPress={() => {
                formRef.current?.submitForm();
              }}
            >
              CRIAR TICKET
            </Button>
          </Notification>
        </BoxContainer>
      </Container>
    </>
  );
};

export default Report;
