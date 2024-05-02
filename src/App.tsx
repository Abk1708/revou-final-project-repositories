// import './App.css'
import MainLayout from "./layout/MainLayout";
import Header from "./view/headerSection";
import Hero_section from "./components/section/Hero_section";

function App() {

  return (
    <MainLayout>
      <Hero_section/>
      <Header/>
    </MainLayout>
  )
}

export default App
