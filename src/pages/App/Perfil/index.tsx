import React, { useCallback, useRef, useContext } from 'react';

import { Modalize } from 'react-native-modalize';
import { Form } from '@unform/mobile';
import { useNavigation } from '@react-navigation/native';
import * as ImagePicker from 'expo-image-picker';
import { ThemeContext } from 'styled-components';
import {
  avatarUpdatedError,
  avatarDeleteError,
  avatarUpdatedSuccess,
  avatarDeleteSuccess,
  requiredPermission,
} from '../../../utils/errorMessages';
import Picker from '../../../components/Picker';
import Header from '../../../components/Header';
import BoxContainer from '../../../components/BoxContainer';
import InfoInput from '../../../components/InfoInput';
import Title from '../../../components/Title';
import Button from '../../../components/Button';
import { api } from '../../../services/api';

import { classes } from '../../../utils/classArrayPicker';

import { useAuth } from '../../../hooks/auth';
import { useReward } from '../../../hooks/rewards';
import { useTheme } from '../../../hooks/theme';

import {
  Modal,
  Container,
  Avatar,
  AvatarButton,
  ProfileInfo,
  Profile,
  Matricula,
  Nome,
  Line,
  Bio,
  TextBold,
  Text,
  Footer,
  Tema,
} from './styles';

const Perfil: React.FC = () => {
  const { colors } = useContext(ThemeContext);
  const { signOut, student, token, updateUser } = useAuth();
  const { darkReward } = useReward();
  const { toggleTheme, theme } = useTheme();
  const { navigate } = useNavigation();
  const modalizeRef = useRef<Modalize>(null);

  const {
    avatarSuap,
    email,
    avatarSaveURL,
    nomeCompleto,
    matricula,
    curso,
    situacao,
    cpf,
    dataDeNascimento,
    emailSuap,
    turma,
    campus,
  } = student;

  const onOpen = () => {
    modalizeRef.current?.open();
  };

  const handleUpdateAvatar = useCallback(async () => {
    const { status } = await ImagePicker.requestCameraRollPermissionsAsync();
    if (status !== 'granted') {
      requiredPermission();
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      quality: 1,
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
    });

    if (result.cancelled) {
      return;
    }

    if (!result.uri) {
      modalizeRef.current?.close();
      return;
    }

    const path = result.uri.split('/');
    const name = path[path.length - 1];
    const { uri: image } = result;

    const data = new FormData();

    data.append('avatar', {
      name,
      type: 'image/jpeg',
      uri: image,
    } as any);

    api
      .put('students/avatar', data, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then(response => {
        updateUser(response.data);
        avatarUpdatedSuccess();
      })
      .catch(err => {
        avatarUpdatedError();
      });
    modalizeRef.current?.close();
  }, [token, updateUser]);

  const handleDeleteAvatar = useCallback(async () => {
    api
      .delete('students/avatar', {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then(response => {
        updateUser(response.data);
        avatarDeleteSuccess();
      })
      .catch(err => {
        avatarDeleteError();
      });
    modalizeRef.current?.close();
  }, [updateUser, token]);

  const handleNavigateToUpdate = useCallback(() => {
    navigate('UpdateProfile');
  }, [navigate]);

  const avatarSuapURL = `https://suap.ifrn.edu.br${avatarSuap}`;
  const arrayData = dataDeNascimento.split('-');
  const dataNascimento = `${arrayData[2]}/${arrayData[1]}/${arrayData[0]}`;

  return (
    <>
      <Modalize
        adjustToContentHeight
        ref={modalizeRef}
        snapPoint={190}
        handleStyle={{ backgroundColor: colors.boxFooter }}
        modalStyle={{ backgroundColor: colors.background }}
      >
        <Modal>
          <Button onPress={handleUpdateAvatar}>ALTERAR IMAGEM</Button>
          <Button onPress={handleDeleteAvatar} redButton>
            REMOVER IMAGEM
          </Button>
        </Modal>
      </Modalize>
      <Container>
        <Header center page="Perfil" />
        <Title>Dados Pessoais</Title>
        <BoxContainer>
          <Profile>
            <AvatarButton onPress={onOpen}>
              <Avatar
                source={{
                  uri: `${avatarSaveURL || avatarSuapURL}`,
                }}
              />
            </AvatarButton>
            <ProfileInfo>
              <Nome>{nomeCompleto}</Nome>
              <Matricula>{matricula}</Matricula>
            </ProfileInfo>
          </Profile>
          <Line />
          <Bio>
            <Text>
              <TextBold>Curso: </TextBold>
              {curso}
              <TextBold>
                {'\n'}
                Situação:{' '}
              </TextBold>
              {situacao}
            </Text>
          </Bio>
          <Form
            onSubmit={() => {
              return undefined;
            }}
          >
            <InfoInput value={cpf} title="CPF" name="cpf" editable={false} />
            <InfoInput
              value={dataNascimento}
              title="DATA DE NASCIMENTO"
              name="dataNascimento"
              editable={false}
            />
            <InfoInput
              value={emailSuap}
              title="EMAIL ACADÊMICO"
              name="emailAcademico"
              editable={false}
            />

            {email ? (
              <InfoInput
                defaultValue={email}
                title="EMAIL"
                name="emailPessoal"
                editable={false}
              />
            ) : (
              <InfoInput
                defaultValue={email}
                placeholder="Atualize seu perfil"
                placeholderTextColor="#E33D3D"
                title="EMAIL"
                name="emailPessoal"
                editable={false}
                error
              />
            )}
          </Form>
          {campus === 'PAR' ? (
            turma ? (
              <Picker
                disabled
                titleInfo="TURMA"
                placeholderLabel="Atualize seu perfil"
                value={student.turma}
                items={classes}
                onValueChange={() => {
                  return undefined;
                }}
              />
            ) : (
              <Picker
                pickerError
                disabled
                titleInfo="TURMA"
                placeholderLabel="Atualize seu perfil"
                value={student.turma}
                items={classes}
                onValueChange={() => {
                  return undefined;
                }}
              />
            )
          ) : undefined}
          {darkReward && (
            <Tema>
              <Picker
                placeholderLabel="Selecione um tema"
                iconName="moon"
                titleInfo="TEMA"
                itemKey={theme.title}
                items={[
                  { label: 'Light', value: 'light', key: 'light' },
                  { label: 'Dark', value: 'dark', key: 'dark' },
                ]}
                onValueChange={value => toggleTheme(value)}
              />
            </Tema>
          )}
          <Footer>
            <Button onPress={handleNavigateToUpdate}>EDITAR PERFIL</Button>
            <Button redButton onPress={signOut}>
              FAZER LOGOUT
            </Button>
          </Footer>
        </BoxContainer>
      </Container>
    </>
  );
};

export default Perfil;
