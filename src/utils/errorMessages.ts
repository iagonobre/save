import NetInfo from '@react-native-community/netinfo';
import { showMessage } from 'react-native-flash-message';

export const errorConnection: Function = () => {
  showMessage({
    duration: 5000,
    message: 'Sem conexão',
    type: 'danger',
    backgroundColor: '#E33D3D',
    titleStyle: {
      fontFamily: 'Archivo_700Bold',
    },
    textStyle: {
      fontFamily: 'Archivo_400Regular',
    },
    icon: 'danger',
  });
};

export const errorGeneric: Function = (message: string) => {
  showMessage({
    message: `Ocorreu um erro!`,
    description: `${message}`,
    type: 'danger',
    animationDuration: 1000,
    backgroundColor: '#E33D3D',
    titleStyle: {
      fontFamily: 'Archivo_700Bold',
    },
    textStyle: {
      fontFamily: 'Archivo_400Regular',
    },
    icon: 'danger',
  });
};

export const updatedSuccess: Function = () => {
  showMessage({
    message: 'Atualizado com sucesso',
    description: 'Dados atualizados com sucesso!',
    type: 'success',
    animationDuration: 1000,
    backgroundColor: '#00AE91',
    titleStyle: {
      fontFamily: 'Archivo_700Bold',
    },
    textStyle: {
      fontFamily: 'Archivo_400Regular',
    },
    icon: 'success',
  });
};

export const ticketSucess: Function = () => {
  showMessage({
    message: 'Ticket criado com sucesso!',
    description: 'Logo mais ele será avaliado pela nossa Equipe',
    type: 'success',
    animationDuration: 1000,
    backgroundColor: '#00AE91',
    titleStyle: {
      fontFamily: 'Archivo_700Bold',
    },
    textStyle: {
      fontFamily: 'Archivo_400Regular',
    },
    icon: 'success',
  });
};

export const updatedError: Function = () => {
  showMessage({
    message: 'Erro ao atualizar',
    description: 'Por favor, verifique seus dados.',
    type: 'danger',
    animationDuration: 1000,
    backgroundColor: '#E33D3D',
    titleStyle: {
      fontFamily: 'Archivo_700Bold',
    },
    textStyle: {
      fontFamily: 'Archivo_400Regular',
    },
    icon: 'danger',
  });
};

export const requiredPermission: Function = () => {
  showMessage({
    message: 'Permissão necessária',
    description: 'Conceda a permissão para realizar esta tarefa.',
    type: 'danger',
    animationDuration: 1000,
    backgroundColor: '#E33D3D',
    titleStyle: {
      fontFamily: 'Archivo_700Bold',
    },
    textStyle: {
      fontFamily: 'Archivo_400Regular',
    },
    icon: 'danger',
  });
};

export const avatarUpdatedError: Function = () => {
  showMessage({
    message: 'Erro ao atualizar',
    description: 'Erro ao atualizar avatar, tente novamente.',
    type: 'danger',
    animationDuration: 1000,
    backgroundColor: '#E33D3D',
    titleStyle: {
      fontFamily: 'Archivo_700Bold',
    },
    textStyle: {
      fontFamily: 'Archivo_400Regular',
    },
    icon: 'danger',
  });
};

export const avatarDeleteError: Function = () => {
  showMessage({
    message: 'Erro ao deletar.',
    description: 'Foto de perfil inexistente.',
    type: 'danger',
    animationDuration: 1000,
    backgroundColor: '#E33D3D',
    titleStyle: {
      fontFamily: 'Archivo_700Bold',
    },
    textStyle: {
      fontFamily: 'Archivo_400Regular',
    },
    icon: 'danger',
  });
};

export const avatarUpdatedSuccess: Function = () => {
  showMessage({
    message: 'Atualizado com sucesso',
    description: 'Foto atualizada com sucesso!',
    type: 'success',
    animationDuration: 1000,
    backgroundColor: '#00AE91',
    titleStyle: {
      fontFamily: 'Archivo_700Bold',
    },
    textStyle: {
      fontFamily: 'Archivo_400Regular',
    },
    icon: 'success',
  });
};

export const avatarDeleteSuccess: Function = () => {
  showMessage({
    message: 'Removido com sucesso',
    description: 'Seu perfil voltará a ter a foto do SUAP.',
    type: 'success',
    animationDuration: 1000,
    backgroundColor: '#00AE91',
    titleStyle: {
      fontFamily: 'Archivo_700Bold',
    },
    textStyle: {
      fontFamily: 'Archivo_400Regular',
    },
    icon: 'success',
  });
};

export const notifySuccess: Function = () => {
  showMessage({
    message: 'Enviado com sucesso',
    description: 'Notificação enviada com sucesso!',
    type: 'success',
    animationDuration: 1000,
    backgroundColor: '#00AE91',
    titleStyle: {
      fontFamily: 'Archivo_700Bold',
    },
    textStyle: {
      fontFamily: 'Archivo_400Regular',
    },
    icon: 'success',
  });
};

export const loginError: Function = () => {
  showMessage({
    message: 'Erro ao acessar',
    description: 'Por favor, verifique seus dados.',
    type: 'danger',
    animationDuration: 800,
    backgroundColor: '#E33D3D',
    titleStyle: {
      fontFamily: 'Archivo_700Bold',
    },
    textStyle: {
      fontFamily: 'Archivo_400Regular',
    },
    icon: 'danger',
  });
};

export const periodNotFound: Function = () => {
  showMessage({
    message: 'Período letivo inválido',
    description: 'Por favor, verifique o período letivo selecionado.',
    type: 'danger',
    animationDuration: 1200,
    backgroundColor: '#E33D3D',
    titleStyle: {
      fontFamily: 'Archivo_700Bold',
    },
    textStyle: {
      fontFamily: 'Archivo_400Regular',
    },
    icon: 'danger',
  });
};
