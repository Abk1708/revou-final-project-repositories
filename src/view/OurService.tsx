import tracktorsforservice from "../assets/Traacktors for service.webp";
import irrigationforservice from "../assets/lumin-osity-6DMht7wYt6g-unsplash.webp";
import greenhouse from "../assets/devi-puspita-amartha-yahya-DViG1hfL1-w-unsplash.webp";
import Sustainable from '../assets/energy-control.png';
import SolarCells from '../assets/nuno-marques-0GbrjL3vZF4-unsplash.webp';
import Breadcrumb from "../components/BreadCrumbs/BreadCrumbs";
import Card from "../components/CardItems/CardItems";
import sdgEmblems from '../assets/E_SDG_logo_without_UN_emblem_Square_WEB.png.png'
import Sdg from "../components/SDG-icon/Sdg";

const OurService = () => {

  const BreadcrumbItem = [
    { label: "Home", to: "/" },
    { label: "Our Service", to: "/OurService" },
  ]

  const CardRenderItem = [{
    imageUrl: tracktorsforservice,
    title: 'e-Tractors',
    description: 'Tractors powered with solar cell batteries, eco-friendly, and easy maintenance.',
    to:'/Dashboard'
  },
  {
    imageUrl: irrigationforservice,
    title: 'Irrigation Systems',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    to:'/Dashboard'
  },
  {
    imageUrl: greenhouse,
    title: 'Greenhouse Cultivation',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    to:'/Dashboard',
  },
  {
    imageUrl: SolarCells,
    title: 'Solar Cells',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    to:'/Dashboard'
  },
  ]

// const CardRenderEnergy = [
  
// ]


  return (
    <div className="bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-12">
        <h1 className="text-3xl font-bold text-center">Our Service</h1>
        <Breadcrumb items={BreadcrumbItem} />
        <div className="mt-8">
          <Card items={CardRenderItem} />
        </div>
      </div>

      <section className="bg-white py-12 text-center">
        <h2 className="text-3xl font-bold text-gray-900">Sustainable Development Goals</h2>
        <p className="text-lg px-4 mb-6">Our initiatives align with United Nations strategies to tackle problems through Sustainable Development Goals programs.</p>
        <img src={sdgEmblems} alt="SDG Logo" className="mx-auto w-48" />
        <Sdg />
      </section>

      <div className="container mx-auto px-4 py-12 bg-gray-800">
        <h2 className="text-3xl font-bold text-center text-white">Sustainable Power</h2>
        <div className="mt-8">
          <Card items={CardRenderItem.slice(0, 2)} />
          <div className="mt-8 p-8 bg-yellow-400 text-gray-800 rounded-lg shadow-lg">
            <h3 className="text-2xl font-bold">Sustainable Energy</h3>
            <img src={Sustainable} alt="Sustainable energy icon" className="mx-auto w-20 h-20 mt-4" />
            <p>We understand how critical energy issues impact village life and farming.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OurService;