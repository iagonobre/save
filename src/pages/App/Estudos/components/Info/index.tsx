import React, { useState, useCallback, useEffect, useContext } from 'react';
import SkeletonContent from 'react-native-skeleton-content';
import { ThemeContext } from 'styled-components';

import * as MailComposer from 'expo-mail-composer';

import { Feather } from '@expo/vector-icons';

import { suapApi } from '../../../../../services/api';
import { errorGeneric } from '../../../../../utils/errorMessages';
import { infosSkeletonStyle } from '../../../../../utils/skeletonStyles';

import { useAuth } from '../../../../../hooks/auth';

import NotFound from '../../../../../components/NotFound';
import DashboardTitles from '../../../../../components/DashboardTitles';
import DashboardBox from '../../../../../components/DashboardBox';

import {
  Container,
  ListContainer,
  ProfAvatar,
  Avatar,
  ProfInfo,
  ProfName,
  ProfText,
  ProfLine,
  ProfEmail,
  EmailBox,
  ContentText,
  ContentBox,
  EmailButton,
} from './styles';

interface InfoProps {
  materia: string;
}

interface ProfObject {
  foto: string;
  nome: string;
  matricula: string;
  email: string;
}

const Info: React.FC<InfoProps> = ({ materia }) => {
  const [loading, setLoading] = useState(true);
  const [professores, setProfesores] = useState([]);
  const [componenteCurricular, setComponenteCurricular] = useState('');
  const [locaisDeAula, setLocaisDeAula] = useState([]);
  const { token, signOut } = useAuth();
  const { colors } = useContext(ThemeContext);

  const handleOpenEmail = useCallback((email: string) => {
    MailComposer.composeAsync({
      recipients: [`${email}`],
    });
  }, []);

  const handleLocaisDeAula = useCallback(() => {
    if (locaisDeAula.length === 0) {
      return 'Nenhum local encontrado.';
    }
    return locaisDeAula.map((locais: string) => {
      return `${locais}${'\n'}`;
    });
  }, [locaisDeAula]);

  const getInfos = useCallback(() => {
    setLoading(true);
    async function requestInfos() {
      await suapApi
        .get(
          `https://suap.ifrn.edu.br/api/v2/minhas-informacoes/turma-virtual/${materia}`,
          {
            headers: {
              Authorization: `JWT ${token}`,
            },
          },
        )
        .then(response => {
          const suapProfs = response.data.professores;

          setLoading(false);
          setProfesores(suapProfs);
          setComponenteCurricular(response.data.componente_curricular);
          setLocaisDeAula(response.data.locais_de_aula);
        })
        .catch(err => {
          setLoading(false);
          if (err.response.status === 401) {
            signOut();
          } else {
            errorGeneric(err.response.data.message);
          }
        });
    }
    requestInfos();
  }, [token, signOut, materia]);

  useEffect(() => {
    getInfos();
  }, [getInfos]);

  if (professores.length === 0) {
    return (
      <Container>
        <DashboardTitles subtitle="Informações adicionais sobre a disciplina.">
          Informações
        </DashboardTitles>
        {loading ? (
          <SkeletonContent
            boneColor={colors.background}
            highlightColor={colors.boxFooter}
            containerStyle={{ flex: 1, marginHorizontal: 18, marginTop: 18 }}
            isLoading
            layout={infosSkeletonStyle}
          />
        ) : (
          <NotFound
            message="Nenhuma informação disponível!"
            submessage="Finalmente encontrei a paz."
          />
        )}
      </Container>
    );
  }

  return (
    <Container>
      <DashboardTitles subtitle="Informações adicionais sobre a disciplina.">
        Informações
      </DashboardTitles>
      {loading ? (
        <SkeletonContent
          boneColor={colors.background}
          highlightColor={colors.boxFooter}
          containerStyle={{ flex: 1, marginHorizontal: 18, marginTop: 18 }}
          isLoading
          layout={infosSkeletonStyle}
        />
      ) : (
        <ListContainer>
          {professores.map((obj: ProfObject) => {
            return (
              <DashboardBox
                height={158}
                key={obj.matricula}
                header="Professores"
                alignCenter
              >
                <ProfAvatar>
                  <Avatar
                    source={{
                      uri: `https://suap.ifrn.edu.br/${obj.foto}`,
                    }}
                  />
                  <ProfInfo>
                    <ProfName>{obj.nome}</ProfName>
                    <ProfText>{obj.matricula}</ProfText>
                  </ProfInfo>
                </ProfAvatar>
                <ProfLine />
                <ProfEmail>
                  <EmailBox>
                    <ProfText>Email Acadêmico</ProfText>
                    <ContentText>{obj.email}</ContentText>
                  </EmailBox>
                  <EmailButton onPress={() => handleOpenEmail(obj.email)}>
                    <Feather name="mail" size={20} color={colors.boxBase} />
                  </EmailButton>
                </ProfEmail>
              </DashboardBox>
            );
          })}
          <DashboardBox height={118} header="Disciplina">
            <ContentBox>
              <ProfText>Componente Curricular:</ProfText>
              <ContentText numberOfLines={2}>
                {componenteCurricular}
              </ContentText>
              <ProfText style={{ marginTop: 8 }}>Locais de Aula:</ProfText>
              <ContentText>{handleLocaisDeAula()}</ContentText>
            </ContentBox>
          </DashboardBox>
        </ListContainer>
      )}
    </Container>
  );
};

export default Info;
