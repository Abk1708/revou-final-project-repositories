import { Routes, Route } from 'react-router-dom';
// import Navigation from '../components/Navigation_bar';
import Header from '../view/headerSection';


const Router = () => {
return (
    <Routes>
        <Route path="/" element={<Header/>} /> 
        {/* <Route path="/Hero" element={< />} /> */}
        {/* <Route path="/layers" element={} /> */}
    </Routes>
)
};

export default Router