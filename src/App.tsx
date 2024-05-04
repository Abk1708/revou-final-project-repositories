import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
// import HomePage from '../src/view/HomePage';
import OurService from './view/OurService';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route 
        path="/" 
        element={
            <OurService/>
        } />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
