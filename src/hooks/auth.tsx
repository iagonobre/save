import React, {
  useEffect,
  createContext,
  useCallback,
  useState,
  useContext,
} from 'react';
import AsyncStorage from '@react-native-community/async-storage';
import { api } from '../services/api';

interface Student {
  matricula: string;
  nomeUsual: string;
  cpf: string;
  dataDeNascimento: string;
  emailSuap: string;
  email: string;
  avatarSuap: string;
  avatarSaveURL: string;
  nomeCompleto: string;
  campus: string;
  situacao: string;
  curso: string;
  turma: string;
}

interface AuthState {
  token: string;
  student: Student;
}

interface SignInCredentials {
  matricula: string;
  password: string;
}

interface AuthContextData {
  student: Student;
  token: string;
  loading: boolean;
  signIn(credentials: SignInCredentials): Promise<void>;
  signOut(): void;
  updateUser(student: Student): void;
}

export const AuthContext = createContext<AuthContextData>(
  {} as AuthContextData,
);

export const AuthProvider: React.FC = ({ children }) => {
  const [data, setData] = useState<AuthState>({} as AuthState);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadStorageData(): Promise<void> {
      const [token, student] = await AsyncStorage.multiGet([
        '@Save:token',
        '@Save:student',
      ]);

      if (token[1] && student[1]) {
        setData({ token: token[1], student: JSON.parse(student[1]) });
      }

      setLoading(false);
    }
    loadStorageData();
  }, []);

  const signIn = useCallback(async ({ matricula, password }) => {
    const response = await api.post('/students', {
      matricula,
      password,
    });

    const { token, student } = response.data;

    await AsyncStorage.multiSet([
      ['@Save:token', token],
      ['@Save:student', JSON.stringify(student)],
    ]);

    setData({ token, student });
  }, []);

  const signOut = useCallback(async () => {
    await AsyncStorage.multiRemove(['@Save:token', '@Save:student']);

    setData({} as AuthState);
  }, []);

  const updateUser = useCallback(
    (student: Student) => {
      setData({
        token: data.token,
        student,
      });
    },
    [setData, data.token],
  );

  return (
    <AuthContext.Provider
      value={{
        student: data.student,
        token: data.token,
        signIn,
        signOut,
        loading,
        updateUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export function useAuth(): AuthContextData {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }

  return context;
}
