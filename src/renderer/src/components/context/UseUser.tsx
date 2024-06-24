
import { createContext, useContext, useState, FC, ReactNode } from 'react';

interface User {
  id: string;
  nome: string;
  dataNascimento: string;
  telefone: string;
  sexo: string;
  senha: string;
}

interface UserContextType {
  userData: User | null;
  setUserData: (user: User | null) => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider: FC<{ children: ReactNode }> = ({ children }) => {
    const [userData, setUserData] = useState<User | null>(null);

    return (
        <UserContext.Provider value={{ userData, setUserData }}>
            {children}
        </UserContext.Provider>
    );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};
