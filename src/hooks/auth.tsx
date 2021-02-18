import React, {
  useEffect,
  createContext,
  useCallback,
  useState,
  useContext,
} from 'react';
import AsyncStorage from '@react-native-community/async-storage';
import { api, suapApi } from '../services/api';

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
  admin: boolean;
}

interface AuthState {
  student: Student;
  token: string;
}

interface SignInCredentials {
  matricula: string;
  password: string;
}

interface AuthContextData {
  student: Student;
  token: string;
  loading: boolean;
  periodKey: string;
  renew(): Promise<void>;
  signIn(credentials: SignInCredentials): Promise<void>;
  signOut(): void;
  setPeriodKey(period: string): void;
  updateUser(student: Student, token: string): void;
}

export const AuthContext = createContext<AuthContextData>(
  {} as AuthContextData,
);

export const AuthProvider: React.FC = ({ children }) => {
  const [data, setData] = useState<AuthState>({} as AuthState);
  const [periodKey, setStatePeriodKey] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadStorageData(): Promise<void> {
      const [token, student, period] = await AsyncStorage.multiGet([
        '@Save:token',
        '@Save:student',
        '@Save:period',
      ]);

      if (token[1] && student[1]) {
        setData({ token: token[1], student: JSON.parse(student[1]) });
      }

      if (period[1]) {
        setStatePeriodKey(JSON.parse(period[1]));
      }

      setLoading(false);
    }
    loadStorageData();
  }, []);

  const signIn = useCallback(async ({ matricula, password }) => {
    const response = await suapApi.post('/autenticacao/token/', {
      username: matricula,
      password,
    });

    const { token } = response.data;

    const getStudent = await api.get('/students/', {
      headers: { Authorization: `Bearer ${token}` },
    });

    const student = getStudent.data;

    await AsyncStorage.multiSet([
      ['@Save:token', token],
      ['@Save:password', password],
      ['@Save:student', JSON.stringify(student)],
    ]);

    setData({ student, token });
  }, []);

  const signOut = useCallback(async () => {
    await AsyncStorage.multiRemove([
      '@Save:token',
      '@Save:student',
      '@Save:password',
    ]);

    setData({} as AuthState);
  }, []);

  const setPeriodKey = useCallback(async (period: string) => {
    await AsyncStorage.setItem('@Save:period', JSON.stringify(period));
  }, []);

  const renew = useCallback(async () => {
    const oldToken = await AsyncStorage.getItem('@Save:token');

    try {
      const renewToken = await suapApi.post('/autenticacao/token/refresh/', {
        token: oldToken,
      });

      const { token } = renewToken.data;

      const getStudent = await api.get('/students/', {
        headers: { Authorization: `Bearer ${token}` },
      });

      const { student } = getStudent.data;

      await AsyncStorage.multiSet([
        ['@Save:token', token],
        ['@Save:student', JSON.stringify(student)],
      ]);

      setData({ token, student });
    } catch (err) {
      signOut();
    }
  }, [signOut]);

  const updateUser = useCallback(
    (student: Student, token) => {
      setData({
        student,
        token,
      });
    },
    [setData],
  );

  return (
    <AuthContext.Provider
      value={{
        student: data.student,
        token: data.token,
        signIn,
        setPeriodKey,
        periodKey,
        renew,
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
