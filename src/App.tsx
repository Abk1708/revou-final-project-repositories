import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomePage from '../src/view/HomePage';
import OurService from './view/OurService';
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
      </Routes>
    </BrowserRouter>
  );
}

export default App;
