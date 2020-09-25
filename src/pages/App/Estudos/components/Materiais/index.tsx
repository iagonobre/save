import React, { useState, useCallback, useEffect, useContext } from 'react';
import SkeletonContent from 'react-native-skeleton-content';
import { Linking } from 'react-native';
import { ThemeContext } from 'styled-components';

import { Feather } from '@expo/vector-icons';
import { suapApi } from '../../../../../services/api';

import { materiaisSkeletonStyle } from '../../../../../utils/skeletonStyles';

import { useAuth } from '../../../../../hooks/auth';

import FinalList from '../../../../../components/FinalList';
import DashboardTitles from '../../../../../components/DashboardTitles';
import NotFound from '../../../../../components/NotFound';

import {
  Container,
  ListContainer,
  BoxDownload,
  BoxText,
  DateText,
  DownloadButton,
  TextContainer,
} from './styles';

interface MateriaisProps {
  materia: string;
}

interface MaterialObject {
  url: string;
  descricao: string;
  data_vinculacao: string;
}

const Materiais: React.FC<MateriaisProps> = ({ materia }) => {
  const [loading, setLoading] = useState(true);
  const [materiaisDeAula, setMateriaisDeAula] = useState([]);
  const { token, renew, student } = useAuth();
  const { matricula } = student;
  const { colors } = useContext(ThemeContext);

  const getDownloads = useCallback(() => {
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
          const suapMateriais = response.data.materiais_de_aula;

          setMateriaisDeAula(suapMateriais);
          setLoading(false);
        })
        .catch(err => {
          setLoading(false);
          if (err.response.status === 401) {
            renew(matricula);
          }
        });
    }
    requestDownloads();
  }, [materia, token, renew, matricula]);

  useEffect(() => {
    getDownloads();
  }, [getDownloads]);

  if (materiaisDeAula.length === 0) {
    return (
      <Container>
        <DashboardTitles subtitle="Escolha um material e aperte para baixar.">
          Materiais de Aula
        </DashboardTitles>
        {loading ? (
          <SkeletonContent
            boneColor={colors.background}
            highlightColor={colors.boxFooter}
            containerStyle={{ flex: 1, marginHorizontal: 18, marginTop: 18 }}
            isLoading
            layout={materiaisSkeletonStyle}
          />
        ) : (
          <NotFound
            message="Nenhum material disponível!"
            submessage="Finalmente encontrei a paz."
          />
        )}
      </Container>
    );
  }

  return (
    <Container>
      <DashboardTitles subtitle="Escolha um material e aperte para baixar.">
        Materiais de Aula
      </DashboardTitles>
      {loading ? (
        <SkeletonContent
          boneColor={colors.background}
          highlightColor={colors.boxFooter}
          containerStyle={{ flex: 1, marginHorizontal: 18, marginTop: 18 }}
          isLoading
          layout={materiaisSkeletonStyle}
        />
      ) : (
        <ListContainer>
          {materiaisDeAula.map((obj: MaterialObject) => {
            const arrayData = obj.data_vinculacao.split('-');
            const data = ` ${arrayData[2]}/${arrayData[1]}/${arrayData[0]}`;
            return (
              <BoxDownload key={obj.url}>
                <TextContainer>
                  {obj.descricao ? (
                    <BoxText numberOfLines={2}>{obj.descricao}</BoxText>
                  ) : (
                    <BoxText>Sem título</BoxText>
                  )}
                  <DateText>
                    Postado no dia
                    {data}
                  </DateText>
                </TextContainer>
                <DownloadButton
                  onPress={
                    () => Linking.openURL(`https://suap.ifrn.edu.br${obj.url}`)
                    // eslint-disable-next-line react/jsx-curly-newline
                  }
                >
                  <Feather
                    name="download"
                    size={24}
                    color={colors.textPurple}
                  />
                </DownloadButton>
              </BoxDownload>
            );
          })}
        </ListContainer>
      )}
      {loading ? undefined : <FinalList />}
    </Container>
  );
};

export default Materiais;
