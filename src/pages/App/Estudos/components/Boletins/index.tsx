import React, { useState, useCallback, useEffect, useContext } from 'react';
import SkeletonContent from 'react-native-skeleton-content';

import { ThemeContext } from 'styled-components';

import { suapApi } from '../../../../../services/api';

import { boletimSkeletonStyle } from '../../../../../utils/skeletonStyles';

import { useAuth } from '../../../../../hooks/auth';

import FinalList from '../../../../../components/FinalList';
import DashboardBox from '../../../../../components/DashboardBox';
import DashboardTitles from '../../../../../components/DashboardTitles';
import SquadNumber from '../../../../../components/SquadNumber';
import AcademicSituation from '../../../../../components/AcademicSituation';

import boletimImage from '../../../../../assets/images/boletim.png';

import {
  Container,
  BoletimContainer,
  ReportContainer,
  Line,
  StatusTitle,
  StatusContent,
  StatusBold,
  Banner,
} from './styles';

interface BoletimProps {
  materia: string;
  periodo: string;
}

interface BoletimObject {
  codigo_diario: string;
  disciplina: string;
  segundo_semestre: boolean;
  carga_horaria: number;
  carga_horaria_cumprida: number;
  numero_faltas: number;
  percentual_carga_horaria_frequentada: number;
  situacao: string;
  quantidade_avaliacoes: number;
  media_disciplina: number;
  media_final_disciplina: string;
  nota_avaliacao_final: {
    nota: number;
  };
  nota_etapa_1: {
    nota: number;
    faltas: number;
  };
  nota_etapa_2: {
    nota: number;
    faltas: number;
  };
  nota_etapa_3: {
    nota: number;
    faltas: number;
  };
  nota_etapa_4: {
    nota: number;
    faltas: number;
  };
}

const Boletim: React.FC<BoletimProps> = ({ materia, periodo }) => {
  const { colors } = useContext(ThemeContext);
  const [loading, setLoading] = useState(true);
  const [boletim, setBoletim] = useState({} as BoletimObject);
  const { token, signOut } = useAuth();
  const {
    nota_etapa_1,
    nota_etapa_2,
    nota_etapa_3,
    nota_etapa_4,
    segundo_semestre,
    quantidade_avaliacoes,
    percentual_carga_horaria_frequentada,
  } = boletim;

  const getBoletins = useCallback(() => {
    async function requestBoletins() {
      setLoading(true);
      await suapApi
        .get(
          `https://suap.ifrn.edu.br/api/v2/minhas-informacoes/boletim/${periodo}`,
          {
            headers: {
              Authorization: `JWT ${token}`,
            },
          },
        )
        .then(response => {
          const current = response.data.filter((obj: BoletimObject) => {
            return obj.codigo_diario === materia;
          });

          setBoletim(current[0]);
          setLoading(false);
        })
        .catch(err => {
          setLoading(false);
          if (err.response.status === 401) {
            signOut();
          }
        });
    }
    requestBoletins();
  }, [materia, token, signOut, periodo]);

  useEffect(() => {
    getBoletins();
  }, [getBoletins]);

  return (
    <Container>
      <DashboardTitles subtitle="Confira suas notas e frêquencia na disciplina.">
        Boletim
      </DashboardTitles>
      {loading ? (
        <SkeletonContent
          boneColor={colors.background}
          highlightColor={colors.boxFooter}
          containerStyle={{ flex: 1, marginHorizontal: 18, marginTop: 18 }}
          isLoading
          layout={boletimSkeletonStyle}
        />
      ) : (
        <BoletimContainer>
          <DashboardBox header={boletim.disciplina} height={568} alignCenter>
            <ReportContainer>
              {segundo_semestre && quantidade_avaliacoes === 2 ? (
                <>
                  <SquadNumber info="X" />
                  <SquadNumber info="X" />
                  <SquadNumber number={nota_etapa_1.nota} info="3° BI" />
                  <SquadNumber number={nota_etapa_2.nota} info="4° BI" />
                </>
              ) : null}
              {!segundo_semestre && quantidade_avaliacoes === 2 ? (
                <>
                  <SquadNumber number={nota_etapa_1.nota} info="1° BI" />
                  <SquadNumber number={nota_etapa_2.nota} info="2° BI" />
                  <SquadNumber info="X" />
                  <SquadNumber info="X" />
                </>
              ) : null}
              {!segundo_semestre && quantidade_avaliacoes === 4 ? (
                <>
                  <SquadNumber number={nota_etapa_1.nota} info="1° BI" />
                  <SquadNumber number={nota_etapa_2.nota} info="2° BI" />
                  <SquadNumber number={nota_etapa_3.nota} info="3° BI" />
                  <SquadNumber number={nota_etapa_4.nota} info="4° BI" />
                </>
              ) : null}
            </ReportContainer>
            <Line />
            <StatusTitle>Situação</StatusTitle>
            <AcademicSituation
              quantidade_avaliacoes={quantidade_avaliacoes}
              nota_avaliacao_final={boletim.nota_avaliacao_final}
              segundo_semestre={segundo_semestre}
              nota_etapa_1={nota_etapa_1}
              nota_etapa_2={nota_etapa_2}
              nota_etapa_3={nota_etapa_3}
              nota_etapa_4={nota_etapa_4}
            />
            <StatusTitle>Frequência</StatusTitle>
            <StatusContent>
              Seu percentual de carga horária frequentada nesta matéria é{' '}
              <StatusBold>
                {Math.floor(percentual_carga_horaria_frequentada)}%
              </StatusBold>
              .
            </StatusContent>
            {loading ? undefined : (
              <Banner source={boletimImage} style={{ resizeMode: 'contain' }} />
            )}
            <ReportContainer style={{ width: '80%' }}>
              <SquadNumber number={boletim.media_disciplina} info="MÉDIA" />
              <SquadNumber
                number={Number(boletim.media_final_disciplina)}
                info="MÉDIA FINAL"
              />
              <SquadNumber
                number={boletim.nota_avaliacao_final.nota}
                info="PROVA FINAL"
              />
            </ReportContainer>
            <StatusTitle style={{ marginTop: 0 }}>
              Carga Horária: {boletim.carga_horaria_cumprida}h/
              {boletim.carga_horaria}h
            </StatusTitle>
          </DashboardBox>
        </BoletimContainer>
      )}
      {loading ? undefined : <FinalList />}
    </Container>
  );
};

export default Boletim;
