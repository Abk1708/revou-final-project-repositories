import React from 'react';
import { Route} from 'react-router-dom';
import { useAuth } from "../Utils/useAuth";
import Login from '../view/Login';

interface ProtectedRouteProps {
    element: React.ReactNode;
    path: string;
}

function ProtectedRoute({ path, element }: ProtectedRouteProps) {
    const { isAuthenticated } = useAuth();

    return isAuthenticated ? (
        <Route path={path} element={element} />
    ) : (
        <Route path="/login" element={<Login/>} />
    );
}

export default ProtectedRoute;
