
import MainLayout from './layout/MainLayout';
import DashboardLayout from './layout/DashboardLayout';
import AuthProvider from './Utils/AuthProvider';

import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomePage from '../src/view/HomePage';
import OurService from './view/OurService';
import TechNews  from './view/Tech-News';
import OurCostumer from './view/Our-Costumer';
import Login from './view/Login';
import Register from './view/Register';
import Dashboard from './view/Dashboard';




function App() {
  return (
    <AuthProvider>
        <BrowserRouter>
        <Routes>
            <Route 
            path="/" 
            element={
                <HomePage/>
            }/>
            <Route
            path='/login'
            element={
              <MainLayout>
                <Login/>
              </MainLayout>
            }
            />
            <Route
            path='/register'
            element={
              <MainLayout>
                <Register/>
              </MainLayout>
            }
            />
            <Route
            path='/OurService'
            element={
              <MainLayout>
                <OurService/>
              </MainLayout>
            }
            />
            <Route
            path='/techNews'
            element={
              <MainLayout>
                <TechNews />
              </MainLayout>
            }
            />
            {/* protected layout */}
            <Route
            path='/OurCostumer'
            element={
              <MainLayout>
                <OurCostumer/>
              </MainLayout>
            }/>
            <Route
            path='/Dashboard'
            element={
                <DashboardLayout>
                  <Dashboard username={'gimbald'} village='cikarang,bekasi,jawa barat'/>
                </DashboardLayout>
            }/>
          </Routes>
        </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
