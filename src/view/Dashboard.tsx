import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../assets/style/Dashboard.css';
import WeatherApp from '../components/Weather_app/WeatherApi';
import userBackground from '../assets/hugo-matilla-EFuCATqfblI-unsplash.png';

interface ContentDashboardProps {
  username: string;
  village: string;
}

interface ServiceCardProps {
  title: string;
  description: string;
}

function Dashboard({ username, village }: ContentDashboardProps) {
  const navigate = useNavigate();

  useEffect(() => {
    // Check if token exists in localStorage
    const token = localStorage.getItem('token');
    if (!token) {
      alert('You need to login first');
      // Navigate to login page if token doesn't exist
      navigate('/Login');
    }
  }, [navigate]);

  return (
    <div className='h-full'>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        {/* Greeting Card */}
        <div
          style={{
            backgroundImage: `url(${userBackground})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center center',
            backgroundRepeat: 'no-repeat',
            width: '100%',
            height: '300px'
          }}
          className="bg-white p-4 shadow-md rounded-lg grid grid-cols-1 col-span-2"
        >
          <h2 className="text-white font-semibold text-xl font-semibold mb-4">Welcome, {username}!</h2>
          <p className='text-white font-bold'>📌{village}</p>
          <p className="text-white text-xxl font-bold">Thank you for using our services. We're glad to have you here, <br />what are you like to do today</p>
        </div>

        <div className="bg-teal-950 p-4 shadow-md rounded-lg md:col-span-1">
          <WeatherApp />
        </div>

        {/* Services Section */}
        <div className="bg-yellow-400 p-4 shadow-md rounded-lg col-span-2 md:col-span-2">
          <h2 className="text-gray-800 text-lg font-semibold mb-4">Our Services</h2>
          <div className="grid grid-cols-1 gap-4">
            {/* Render service cards here */}
            <ServiceCard title="E-Tractor service" description="Rentaling electric tractors in your village area" />
            <ServiceCard title="Irrigation service" description="We Can Provide a Various Method and Tools For Irrigation" />
            <ServiceCard title="GreenHouse Cultivation" description="GreenHouse program can be so much beneficial for sustainable cycle" />
            <ServiceCard title="Solar Panel service" description="Energy especially low price sustainable energy can be first step for brighter future" />
          </div>
        </div>
      </div>
    </div>
  );
}

const ServiceCard = ({ title, description }: ServiceCardProps) => {
  return (
    <div className="bg-slate-900 flex-row p-4 shadow-md rounded-lg service-card transition-transform transform hover:-translate-y-1">
      <h3 className="text-lg text-white font-semibold mb-2">{title}</h3>
      <p className="text-xl text-lime-500">{description}</p>
    </div>
  );
}

export default Dashboard;
