import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomePage from '../src/view/HomePage';
import OurService from './view/OurService';
import TechNews  from './view/Tech-News';
import OurCostumer from './view/Our-Costumer';
import MainLayout from './layout/MainLayout';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route 
        path="/" 
        element={
            <HomePage/>
        }/>
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
            <OurCostumer />
          </MainLayout>
        }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
