import React, { useState, useCallback, useEffect, useContext } from 'react';
import SkeletonContent from 'react-native-skeleton-content';
import { ScrollView } from 'react-native';

import { ThemeContext } from 'styled-components';

import { suapApi } from '../../../../../services/api';
import { errorGeneric } from '../../../../../utils/errorMessages';
import { aulasSkeletonStyle } from '../../../../../utils/skeletonStyles';

import { useAuth } from '../../../../../hooks/auth';

import FinalList from '../../../../../components/FinalList';
import DashboardTitles from '../../../../../components/DashboardTitles';
import DashboardBox from '../../../../../components/DashboardBox';
import NotFound from '../../../../../components/NotFound';

import {
  Container,
  ListContainer,
  AulasContent,
  Content,
  ContentText,
  AulaContainer,
} from './styles';

interface AulasProps {
  materia: string;
}

interface AulasObject {
  data: string;
  quantidade: number;
  faltas: number;
  professor: string;
  conteudo: string;
}

const Aulas: React.FC<AulasProps> = ({ materia }) => {
  const { colors } = useContext(ThemeContext);
  const [loading, setLoading] = useState(true);
  const [aulas, setAulas] = useState([]);
  const { token, signOut } = useAuth();

  const handleTitleHeader = useCallback(
    (faltas: number, quantidade: number, data: string) => {
      if (faltas === 0 && quantidade === 1) {
        return `${data} - 1 aula`;
      }
      if (faltas === 0 && quantidade > 1) {
        return `${data} - ${quantidade} aulas`;
      }
      if (faltas > 1) {
        return `${data} - ${faltas} faltas`;
      }
      return `${data} - 1 falta`;
    },
    [],
  );

  const handleTransformFalta = useCallback((falta: number) => {
    if (falta > 0) {
      return true;
    }
    return false;
  }, []);

  const getAulas = useCallback(() => {
    async function requestDownloads() {
      setLoading(true);
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
          const suapAulas = response.data.aulas;

          setAulas(suapAulas);
          setLoading(false);
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
    requestDownloads();
  }, [token, signOut, materia]);

  useEffect(() => {
    getAulas();
  }, [getAulas]);

  if (aulas.length === 0) {
    return (
      <Container>
        <DashboardTitles subtitle="Arraste para o lado.">Aulas</DashboardTitles>
        {loading ? (
          <SkeletonContent
            boneColor={colors.background}
            highlightColor={colors.boxFooter}
            containerStyle={{ flex: 1, marginHorizontal: 18, marginTop: 18 }}
            isLoading
            layout={aulasSkeletonStyle}
          />
        ) : (
          <NotFound
            message="Nenhuma aula disponível!"
            submessage="Finalmente encontrei a paz."
          />
        )}
      </Container>
    );
  }

  return (
    <Container>
      <DashboardTitles subtitle="Arraste para o lado.">Aulas</DashboardTitles>
      {loading ? (
        <SkeletonContent
          boneColor={colors.background}
          highlightColor={colors.boxFooter}
          containerStyle={{ flex: 1, marginHorizontal: 18, marginTop: 18 }}
          isLoading
          layout={aulasSkeletonStyle}
        />
      ) : (
        <ListContainer>
          <ScrollView
            horizontal
            style={{ width: 307 }}
            showsHorizontalScrollIndicator={false}
            pagingEnabled
            scrollEventThrottle={200}
            decelerationRate="fast"
          >
            {aulas.map((obj: AulasObject) => {
              const arrayData = obj.data.split('-');
              const data = ` ${arrayData[2]}/${arrayData[1]}/${arrayData[0]}`;
              const { faltas, quantidade, conteudo, professor } = obj;
              const titleHeader = handleTitleHeader(faltas, quantidade, data);
              const faltaBoolean = handleTransformFalta(faltas);
              return (
                <AulaContainer key={`${data}${Math.random() * 101}`}>
                  <DashboardBox
                    header={titleHeader}
                    error={faltaBoolean}
                    height={128}
                    alignCenter
                  >
                    <AulasContent>
                      <ContentText>Conteúdo:</ContentText>
                      <Content numberOfLines={2}>{conteudo}</Content>
                      <ContentText style={{ marginTop: 8 }}>
                        Data: {data}
                      </ContentText>
                      <ContentText>Prof: {professor}</ContentText>
                    </AulasContent>
                  </DashboardBox>
                </AulaContainer>
              );
            })}
          </ScrollView>
        </ListContainer>
      )}
      {loading ? undefined : <FinalList />}
    </Container>
  );
};

export default Aulas;
