import { createContext, useState, ReactNode, useEffect } from 'react';

interface AuthContextProps {
    isAuthenticated: boolean;
    login: (token: string) => void; // Update login function to accept token as parameter
    logout: () => void;
}

export const AuthContext = createContext<AuthContextProps | undefined>(undefined);

interface AuthProviderProps {
    children: ReactNode;
}

function AuthProvider({ children }: AuthProviderProps) {
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            setIsAuthenticated(true); // If token exists, user is authenticated
        }
    }, []); // Run only on component mount

    const login = (token: string) => {
        localStorage.setItem('token', token); // Store token in localStorage
        setIsAuthenticated(true);
    }

    const logout = () => {
        localStorage.removeItem('token'); // Remove token from localStorage
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
