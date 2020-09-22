import NetInfo from '@react-native-community/netinfo';
import { showMessage } from 'react-native-flash-message';

interface ErrorGenericProps {
  message: string;
}

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

export const errorGeneric: Function = ({ message }: ErrorGenericProps) => {
  showMessage({
    message: `${message}`,
    description: 'Por favor, contate o administrador.',
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

export const avatarUpdatedError: Function = () => {
  showMessage({
    message: 'Erro ao Atualizar',
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
