import { createContext, useState, ReactNode } from 'react';

interface AuthContextProps {
    isAuthenticated: boolean;
    login: () => void;
    logout: () => void;
}

export const AuthContext = createContext<AuthContextProps | undefined>(undefined);

interface AuthProviderProps {
    children: ReactNode;
}

function AuthProvider({ children }: AuthProviderProps) {
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    const login = () => {
        setIsAuthenticated(true);
    }

    const logout = () => {
        setIsAuthenticated(false);
    }

    const contextValue: AuthContextProps = {
        isAuthenticated,
        login,
        logout
    };

    return (
        <AuthContext.Provider value={contextValue}>
            {children}
        </AuthContext.Provider>
    )
}


export default AuthProvider;
