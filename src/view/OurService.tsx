import agriculture from "../assets/agriculture.png";
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
    <div>
      {/* First section */}
      <section className="bg-slate-800 px-4 py-12 md:px-8 lg:px-16 xl:px-20">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-white sm:text-4xl">
            Our Service
          </h1>
        </div>
        {/* breadCrumbs */}
        <div className="flex flex-row justify-center">
        <Breadcrumb items={BreadcrumbItem}/>
        </div>
        <div className="flex flex-row">
          {/* hero cards */}
        <div className="flex-none w-64 mr-4">
            <div className="service-description bg-green-800 text-center p-8 rounded-lg h-full">
              <h2 className="text-3xl font-extrabold text-black sm:text-4xl">
                Tractors & Automation
              </h2>
              <img
                src={agriculture}
                className="mx-auto mt-6 mb-4 w-16 h-16 sm:w-20 sm:h-20"
                alt="Agriculture-icon"
              />
              <p className="text-gray-100">
                We support domestic products that help farmers work with
                sustainable farming cycles.
              </p>
            </div>
          </div>
        {/* service card */}
          <div className="flex flex-row">
            <Card items={CardRenderItem}/>
          </div>
        </div>
      </section>

{/* Sdg Banner */}

      <section className="bg-white py-5 flex flex-col">
        <div className="flex flex-col justify-center text-center">
          <h2 className="text-3xl line-clamp-3 font-extrabold text-sky-500 sm:text-4xl">Sustainable Developer Goals United Nation </h2>
          <div className=" flex justify-center text-center py-10">
              <p className=" w-[500px] text-lg font-sans line-clamp-3"> Our initiative has a goals that are alligned with United Nations strategies to overcome problem
              through Software Development Goals programs</p>
          </div>
        </div>
        <div className="flex item-center justify-center py-5">
            <img className="w-1/4 h-1/4" src={sdgEmblems} alt="SDG Logo" />
        </div>
        <div >
          <Sdg/>
        </div>
      </section>

{/* energy Service Section */}

      <section className="bg-slate-800 px-4 py-12 md:px-8 lg:px-16 xl:px-20">
      <div className="flex flex-row">
        {/* service card */}
          <div className="flex flex-row">
            <Card items={CardRenderItem}/>
          </div>
                    {/* hero cards */}
        <div className="flex-none w-64 mr-4">
            <div className="service-description bg-yellow-400 text-center p-8 rounded-lg h-full">
              <h2 className="text-3xl font-extrabold text-grey-500 sm:text-4xl">
                Sustainable Power
              </h2>
              <img
                src={Sustainable}
                className="mx-auto mt-6 mb-4 w-16 h-16 sm:w-20 sm:h-20"
                alt="Agriculture-icon"
              />
              <p className="text-gray-100">
                We understand how critical Energy Problem impact into a village and Farm Live in the village
              </p>
            </div>
        </div>
        </div>
      </section>
    </div>
  );
};

export default OurService;
