import React, { useState, useCallback, useEffect, useContext } from 'react';
import { useRoute, useNavigation } from '@react-navigation/native';

import { ThemeContext } from 'styled-components';

import SkeletonContent from 'react-native-skeleton-content';
import Header from '../../../../components/Header';
import Title from '../../../../components/Title';
import Picker from '../../../../components/Picker';
import BoxContainer from '../../../../components/BoxContainer';
import SquareMiniButton from '../../../../components/SquareMiniButton';
import Materiais from '../components/Materiais';
import Boletim from '../components/Boletins';
import Aulas from '../components/Aulas';
import Info from '../components/Info';

import { periodNotFound, errorGeneric } from '../../../../utils/errorMessages';

import { suapApi } from '../../../../services/api';

import { useAuth } from '../../../../hooks/auth';

import searchImage from '../../../../assets/images/search.png';

import {
  estudosSkeletonStylePeriod,
  dashboardSkeletonTab,
} from '../../../../utils/skeletonStyles';

import {
  Container,
  BoxHeader,
  NavBarContainer,
  Line,
  SearchTitle,
  Banner,
  SearchSubtitle,
  SearchContainer,
} from './styles';

interface RouteParams {
  period: string;
}

interface SubjectObject {
  id: string;
  descricao: string;
}

const Dashboard: React.FC = () => {
  const { colors } = useContext(ThemeContext);
  const route = useRoute();
  const { goBack } = useNavigation();
  const { period } = route.params as RouteParams;

  const { token, renew, student } = useAuth();
  const { matricula } = student;

  const [page, setPage] = useState('Materiais');
  const [loading, setLoading] = useState(true);
  const [materias, setMaterias] = useState([]);
  const [selectedSubject, setSelectedSubject] = useState('');

  const handlePage = useCallback((page: string) => {
    setPage(page);
  }, []);

  const handleChangePage = useCallback(
    (page: string, selectedSubject: string) => {
      if (page === 'Materiais') {
        return <Materiais materia={selectedSubject} />;
      }
      if (page === 'Boletim') {
        return <Boletim materia={selectedSubject} periodo={period} />;
      }
      if (page === 'Aulas') {
        return <Aulas materia={selectedSubject} />;
      }
      if (page === 'Info') {
        return <Info materia={selectedSubject} />;
      }
      return undefined;
    },
    [period],
  );

  const getSubjects = useCallback(() => {
    setLoading(true);
    async function requestSubjects() {
      await suapApi
        .get(
          `https://suap.ifrn.edu.br/api/v2/minhas-informacoes/turmas-virtuais/${period}`,
          {
            headers: {
              Authorization: `JWT ${token}`,
            },
          },
        )
        .then(response => {
          const suapSubjects = response.data;

          const data = suapSubjects.map(
            (obj: SubjectObject, materias: Array<object>) => {
              return {
                ...materias,
                label: `${obj.descricao}`,
                value: `${obj.id}`,
                key: `${obj.id}`,
              };
            },
          );

          setMaterias(data);
          setLoading(false);
        })
        .catch(err => {
          setLoading(false);
          if (err.response.status === 404) {
            periodNotFound();
            goBack();
          }
          if (err.response.status === 401) {
            renew(matricula);
          } else {
            errorGeneric(err.response.data.message);
          }
        });
    }
    requestSubjects();
  }, [period, renew, matricula, token, goBack]);

  useEffect(() => {
    getSubjects();
  }, [getSubjects]);

  return (
    <>
      <Container>
        <Header back screenName="Estudos" />
        <Title />
        <BoxContainer>
          <BoxHeader>
            {loading ? (
              <SkeletonContent
                boneColor={colors.background}
                highlightColor={colors.boxFooter}
                containerStyle={{ flex: 1, marginHorizontal: 18 }}
                isLoading
                layout={estudosSkeletonStylePeriod}
              />
            ) : (
              <Picker
                titleInfo="MATÉRIAS"
                iconName="book-open"
                placeholderLabel="Escolha uma matéria"
                items={materias}
                onValueChange={value => {
                  setSelectedSubject(value);
                }}
              />
            )}
            {loading ? (
              <SkeletonContent
                boneColor={colors.background}
                highlightColor={colors.boxFooter}
                containerStyle={{
                  flexDirection: 'row',
                  marginHorizontal: 18,
                  marginTop: 4,
                  marginBottom: 38,
                  justifyContent: 'space-between',
                }}
                isLoading
                layout={dashboardSkeletonTab}
              />
            ) : (
              <NavBarContainer>
                <SquareMiniButton
                  icon="paperclip"
                  text="Materiais"
                  currentPage={page}
                  onPress={() => {
                    handlePage('Materiais');
                  }}
                />
                <SquareMiniButton
                  icon="file-text"
                  text="Boletim"
                  currentPage={page}
                  onPress={() => {
                    handlePage('Boletim');
                  }}
                />
                <SquareMiniButton
                  icon="edit-3"
                  text="Aulas"
                  currentPage={page}
                  onPress={() => {
                    handlePage('Aulas');
                  }}
                />
                <SquareMiniButton
                  icon="info"
                  text="Info"
                  currentPage={page}
                  onPress={() => {
                    handlePage('Info');
                  }}
                />
              </NavBarContainer>
            )}
          </BoxHeader>
          <Line />
          {selectedSubject ? (
            handleChangePage(page, selectedSubject)
          ) : (
            <SearchContainer>
              <SearchTitle>Nenhuma matéria selecionada!</SearchTitle>
              <SearchSubtitle>
                Selecione uma matéria para prosseguir.
              </SearchSubtitle>
              <Banner source={searchImage} style={{ resizeMode: 'contain' }} />
            </SearchContainer>
          )}
        </BoxContainer>
      </Container>
    </>
  );
};

export default Dashboard;
