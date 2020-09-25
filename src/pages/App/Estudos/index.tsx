import React, { useEffect, useState, useCallback, useContext } from 'react';

import { ThemeContext } from 'styled-components';

import SkeletonContent from 'react-native-skeleton-content';
import { useNavigation } from '@react-navigation/native';
import {
  Container,
  PickerContainer,
  Line,
  Banner,
  ButtonContainer,
} from './styles';

import Header from '../../../components/Header';
import Title from '../../../components/Title';
import BoxContainer from '../../../components/BoxContainer';
import Picker from '../../../components/Picker';
import Button from '../../../components/Button';

import { errorGeneric } from '../../../utils/errorMessages';
import { suapApi } from '../../../services/api';

import {
  estudosSkeletonStylePeriod,
  estudosSkeletonStyleButton,
} from '../../../utils/skeletonStyles';

import { useAuth } from '../../../hooks/auth';

import studyImage from '../../../assets/images/study-background.png';

interface PeriodObject {
  ano_letivo: string;
  periodo_letivo: string;
}

const Estudos: React.FC = () => {
  const { colors } = useContext(ThemeContext);
  const { token, signOut, renew, student } = useAuth();
  const { matricula } = student;
  const [periods, setPeriods] = useState([]);
  const [itemKey, setItemKey] = useState('');
  const [loading, setLoading] = useState(true);
  const [value, setValue] = useState('');
  const { navigate } = useNavigation();

  const getClasses = useCallback(() => {
    async function getPeriods(): Promise<void> {
      setLoading(true);
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

          const { key } = data[data.length - 1];
          setItemKey(key);
          setValue(key);
          setPeriods(data);
          setLoading(false);
        })
        .catch(err => {
          if (err.response.status === 401) {
            renew(matricula);
          } else {
            errorGeneric(err.response.data.message);
          }
        });
    }
    getPeriods();
  }, [token, renew, matricula]);

  useEffect(() => {
    getClasses();
  }, [getClasses]);

  function handleNavigateToDashboard() {
    navigate('Dashboard', {
      period: value,
    });
  }

  return (
    <>
      <Container>
        <Header center page="Estudos" />
        <Title>Seus Estudos</Title>
        <BoxContainer>
          <PickerContainer>
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
                iconName="calendar"
                titleInfo="PERÍODO LETIVO"
                placeholderLabel="Escolha um período"
                items={periods}
                itemKey={itemKey}
                onValueChange={value => {
                  setValue(value);
                }}
              />
            )}
          </PickerContainer>
          <Line />
          {loading ? undefined : (
            <Banner source={studyImage} style={{ resizeMode: 'contain' }} />
          )}
          {loading ? (
            <SkeletonContent
              boneColor={colors.background}
              highlightColor={colors.boxFooter}
              containerStyle={{ flex: 1, marginHorizontal: 18 }}
              isLoading
              layout={estudosSkeletonStyleButton}
            />
          ) : (
            <ButtonContainer>
              <Button onPress={handleNavigateToDashboard}>
                ACESSAR DASHBOARD
              </Button>
            </ButtonContainer>
          )}
        </BoxContainer>
      </Container>
    </>
  );
};

export default Estudos;
