import React, { useState, useCallback, useEffect, useContext } from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';

import { ThemeContext } from 'styled-components';

import SkeletonContent from 'react-native-skeleton-content';
import { RectButton } from 'react-native-gesture-handler';
import Header from '../../../components/Header';
import Title from '../../../components/Title';
import Picker from '../../../components/Picker';
import BoxContainer from '../../../components/BoxContainer';
import SquareMiniButton from '../../../components/SquareMiniButton';
import Materiais from './components/Materiais';
import Boletim from './components/Boletins';
import Aulas from './components/Aulas';
import Info from './components/Info';
import DashboardBox from '../../../components/DashboardBox';

import { periodNotFound, errorGeneric } from '../../../utils/errorMessages';

import { suapApi } from '../../../services/api';

import { useAuth } from '../../../hooks/auth';

import searchImage from '../../../assets/images/search.png';

import {
  estudosSkeletonStylePeriod,
  dashboardSkeletonTab,
  estudosSkeletonStylePeriods,
  boletimSkeletonStyle,
} from '../../../utils/skeletonStyles';

import {
  Container,
  BoxHeader,
  PeriodsContainer,
  PeriodButton,
  PeriodText,
  NavBarContainer,
  Line,
  Grade,
  SearchTitle,
  Banner,
  SearchSubtitle,
  SearchContainer,
  GradeHeaderContainer,
  GradeType,
  GradeText,
  GradeSemestersContainer,
} from './styles';

interface SubjectObject {
  id: string;
  descricao: string;
}

interface Period {
  label: string;
  value: string;
  key: string;
}

interface PeriodObject {
  ano_letivo: string;
  periodo_letivo: string;
}

interface RouteParams {
  periodNotification?: string;
  subjectNotification?: string;
}

interface Boletim {
  segundo_semestre: boolean;
  codigo_diario: string;
  disciplina: string;
  quantidade_avaliacoes: number;
  nota_etapa_1: {
    nota?: number;
  };
  nota_etapa_2: {
    nota?: number;
  };
  nota_etapa_3: {
    nota?: number;
  };
  nota_etapa_4: {
    nota?: number;
  };
}

interface Grades {
  nota1?: number;
  nota2?: number;
  nota3?: number;
  nota4?: number;
}

const Estudos: React.FC = () => {
  const { colors } = useContext(ThemeContext);
  const { goBack } = useNavigation();
  const { params } = useRoute();
  const { token, renew, setPeriodKey, periodKey, student } = useAuth();

  const [periods, setPeriods] = useState<Period[]>([]);
  const [period, setPeriod] = useState('');
  const [boletins, setBoletins] = useState<Boletim[]>([]);

  const [page, setPage] = useState('Boletim');

  const [periodLoading, setPeriodLoading] = useState(true);
  const [materiasLoading, setMateriasLoading] = useState(true);
  const [boletinsLoading, setBoletinsLoading] = useState(true);

  const [materias, setMaterias] = useState<Period[]>([]);
  const [selectedSubject, setSelectedSubject] = useState('');

  const { matricula } = student;

  const handlePage = useCallback((page: string) => {
    setPage(page);
  }, []);

  const handleChangePeriod = useCallback(
    (value: string) => {
      setMaterias([]);
      setPeriodKey(value);
      setPeriod(value);
    },
    [setPeriodKey],
  );

  const handleGetReports = useCallback(() => {
    return (
      <SearchContainer>
        <SearchTitle>Boletim Geral</SearchTitle>
        <SearchSubtitle>Toque na matéria para detalhar</SearchSubtitle>
        <DashboardBox header={`Notas - ${period}`}>
          <GradeHeaderContainer>
            <GradeType>MATÉRIA</GradeType>
            <GradeSemestersContainer>
              <GradeType>1° BI</GradeType>
              <GradeType>2° BI</GradeType>
              <GradeType>3° BI</GradeType>
              <GradeType>4° BI</GradeType>
            </GradeSemestersContainer>
          </GradeHeaderContainer>
          {boletins.map(boletim => {
            const [, name] = boletim.disciplina.split('- ');

            function formatGrades(boletim: Boletim): Grades {
              if (
                boletim.segundo_semestre &&
                boletim.quantidade_avaliacoes === 2
              ) {
                return {
                  nota1: undefined,
                  nota2: undefined,
                  nota3: boletim.nota_etapa_1.nota,
                  nota4: boletim.nota_etapa_2.nota,
                };
              }
              if (
                !boletim.segundo_semestre &&
                boletim.quantidade_avaliacoes === 2
              ) {
                return {
                  nota1: boletim.nota_etapa_1.nota,
                  nota2: boletim.nota_etapa_2.nota,
                  nota3: undefined,
                  nota4: undefined,
                };
              }
              return {
                nota1: boletim.nota_etapa_1.nota,
                nota2: boletim.nota_etapa_2.nota,
                nota3: boletim.nota_etapa_3.nota,
                nota4: boletim.nota_etapa_4.nota,
              };
            }

            const grades = formatGrades(boletim);

            return (
              <RectButton
                key={boletim.codigo_diario}
                onPress={() => {
                  setSelectedSubject(boletim.codigo_diario);
                }}
              >
                <Line />
                <GradeHeaderContainer>
                  <GradeType>{name}</GradeType>
                  <GradeSemestersContainer>
                    <Grade>
                      <GradeText
                        redColor={grades.nota1 ? grades.nota1 < 60 : false}
                      >
                        {grades.nota1 || '-'}
                      </GradeText>
                    </Grade>
                    <Grade>
                      <GradeText
                        redColor={grades.nota2 ? grades.nota2 < 60 : false}
                      >
                        {grades.nota2 || '-'}
                      </GradeText>
                    </Grade>
                    <Grade>
                      <GradeText
                        redColor={grades.nota3 ? grades.nota3 < 60 : false}
                      >
                        {grades.nota3 || '-'}
                      </GradeText>
                    </Grade>
                    <Grade>
                      <GradeText
                        redColor={grades.nota4 ? grades.nota4 < 60 : false}
                      >
                        {grades.nota4 || '-'}
                      </GradeText>
                    </Grade>
                  </GradeSemestersContainer>
                </GradeHeaderContainer>
              </RectButton>
            );
          })}
        </DashboardBox>
      </SearchContainer>
    );
  }, [period, boletins]);

  const handleChangePage = useCallback(
    (page: string, selectedSubject: string) => {
      if (page === 'Boletim') {
        return <Boletim materia={selectedSubject} periodo={period} />;
      }
      if (page === 'Materiais') {
        return <Materiais materia={selectedSubject} />;
      }
      if (page === 'Aulas') {
        return <Aulas materia={selectedSubject} />;
      }
      if (page === 'Info') {
        return <Info materia={selectedSubject} />;
      }
      return null;
    },
    [period],
  );

  useEffect(() => {
    if (periodKey) {
      setPeriod(periodKey as string);
    }
  }, [periodKey]);

  useEffect(() => {
    async function getReports(): Promise<void> {
      if (period && token) {
        await suapApi
          .get(
            `https://suap.ifrn.edu.br/api/v2/minhas-informacoes/boletim/${period}`,
            {
              headers: {
                Authorization: `JWT ${token}`,
              },
            },
          )
          .then(response => {
            setBoletins(response.data);
            setBoletinsLoading(false);
          });
      }
    }
    setBoletinsLoading(true);
    getReports();
  }, [period, token]);

  useEffect(() => {
    async function requestSubjects(): Promise<void> {
      if (!period) {
        return;
      }
      await suapApi
        .get(
          `https://suap.ifrn.edu.br/api/v2/minhas-informacoes/turmas-virtuais/${period}`,
          {
            headers: {
              Authorization: `JWT ${token}`,
            },
          },
        )
        .then(async response => {
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
        })
        .catch(err => {
          setMateriasLoading(false);
          if (err.response.status === 404) {
            setPeriod('');
            setPeriodKey('');
            periodNotFound();
            return;
          }
          if (err.response.status === 401) {
            renew(matricula);
          } else {
            setPeriod('');
            setPeriodKey('');
            errorGeneric(err.response.data.message);
          }
        });
    }
    setMateriasLoading(true);
    requestSubjects();
    setMateriasLoading(false);
  }, [matricula, period, token, renew, setPeriod, setPeriodKey]);

  useEffect(() => {
    async function getPeriods(): Promise<void> {
      await suapApi
        .get('/minhas-informacoes/meus-periodos-letivos/', {
          headers: {
            Authorization: `JWT ${token}`,
          },
        })
        .then(response => {
          const suapPeriods = response.data;

          const data = suapPeriods.map(
            (obj: PeriodObject, periods: Array<object>) => {
              return {
                ...periods,
                label: `${obj.ano_letivo}/${obj.periodo_letivo}`,
                value: `${obj.ano_letivo}/${obj.periodo_letivo}`,
                key: `${obj.ano_letivo}/${obj.periodo_letivo}`,
              };
            },
          );

          if (!periodKey) {
            const { key } = data[data.length - 1];
            setPeriod(key);
          }

          setPeriods(data.reverse());
        })
        .catch(err => {
          if (err.response.status === 401) {
            renew(matricula);
          } else {
            errorGeneric(err.response.data.message);
          }
        });
    }

    setPeriodLoading(true);

    setPeriodKey(period);
    getPeriods();

    setPeriodLoading(false);
  }, [
    period,
    setPeriodKey,
    handleChangePeriod,
    renew,
    token,
    goBack,
    matricula,
    periodKey,
    params,
  ]);

  useEffect(() => {
    if (params && materias && periods && boletins) {
      const { periodNotification, subjectNotification } = params as RouteParams;

      if (periodNotification && subjectNotification) {
        handleChangePeriod(periodNotification);
        setSelectedSubject(subjectNotification);
        setPage('Boletim');
      }
    }
  }, [params, materias, periods, boletins, handleChangePeriod]);

  return (
    <>
      <Container>
        <Header center page="Estudos" />
        <Title />
        <BoxContainer>
          <BoxHeader>
            {periodLoading ? (
              <SkeletonContent
                boneColor={colors.background}
                highlightColor={colors.boxFooter}
                containerStyle={{
                  flex: 1,
                  marginHorizontal: 18,
                  flexDirection: 'row',
                }}
                isLoading
                layout={estudosSkeletonStylePeriods}
              />
            ) : (
              <PeriodsContainer
                horizontal
                showsHorizontalScrollIndicator={false}
              >
                {periods.map((suapPeriod: Period) => (
                  <PeriodButton
                    key={suapPeriod.value}
                    isCurrentPeriod={suapPeriod.value === period}
                    onPress={() => handleChangePeriod(suapPeriod.value)}
                  >
                    <PeriodText isCurrentPeriod={suapPeriod.value === period}>
                      {suapPeriod.label}
                    </PeriodText>
                  </PeriodButton>
                ))}
              </PeriodsContainer>
            )}
            {materiasLoading ? (
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
                placeholderLabel="Boletim Geral"
                placeholderValue=""
                items={materias}
                value={selectedSubject}
                onValueChange={value => {
                  setSelectedSubject(value);
                }}
              />
            )}
            {materiasLoading && periodLoading ? (
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
                  icon="file-text"
                  text="Boletim"
                  currentPage={page}
                  onPress={() => {
                    handlePage('Boletim');
                  }}
                />
                <SquareMiniButton
                  icon="paperclip"
                  text="Materiais"
                  currentPage={page}
                  onPress={() => {
                    handlePage('Materiais');
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
          ) : !period ? (
            <SearchContainer>
              <SearchTitle>Nenhum período selecionado!</SearchTitle>
              <SearchSubtitle>
                Selecione um período para prosseguir.
              </SearchSubtitle>
              <Banner source={searchImage} style={{ resizeMode: 'contain' }} />
            </SearchContainer>
          ) : page === 'Boletim' ? (
            boletinsLoading ? (
              <SkeletonContent
                boneColor={colors.background}
                highlightColor={colors.boxFooter}
                containerStyle={{
                  flex: 1,
                  marginHorizontal: 18,
                  marginTop: 18,
                  paddingBottom: 18,
                }}
                isLoading
                layout={boletimSkeletonStyle}
              />
            ) : (
              handleGetReports()
            )
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

export default Estudos;
