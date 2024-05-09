import '../assets/style/Dashboard.css'
import WeatherApp from '../components/Weather_app/WeatherApi';

interface ContentDashboardProps {
  username: string;
  village:string;
}

interface ServiceCardProps {
  title: string;
  description: string;
}



function Dashboard({username , village}:ContentDashboardProps) {
    return (
        <div id="outer-container" className='h-full'>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3">
            {/* Greeting Card */}
                <div className="bg-white p-4 shadow-md rounded-lg grid grid-cols-1 col-span-2">
                    <h2 className="text-gray-800 text-lg font-semibold mb-4">Welcome, {username}!</h2>
                    <p>📌{village}</p>
                    <p className="text-gray-600">Thank you for using our services. We're glad to have you here, <br/>what are you like to do today</p>
                </div>

                <div className="bg-slate-600 p-4 shadow-md rounded-lg grid-cols-4">
                  <WeatherApp />
                </div>

                {/* Services Section */}
                <div className="bg-white p-4 shadow-md rounded-lg col-span-3">
                    <h2 className="text-gray-800 text-lg font-semibold mb-4">Our Services</h2>
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
                    {/* Render service cards here */}
                    <ServiceCard title="Service 1" description="Description of Service 1" />
                    <ServiceCard title="Service 2" description="Description of Service 2" />
                    <ServiceCard title="Service 3" description="Description of Service 3" />
                    <ServiceCard title="Service 3" description="Description of Service 3" />
                    <ServiceCard title="Service 3" description="Description of Service 3" />
                    <ServiceCard title="Service 3" description="Description of Service 3" />
                    </div>
                </div>
          </div>
    </div>
  );
}

const ServiceCard = ({ title, description }:ServiceCardProps) => {
    return (
      <div className="bg-gray-100 p-4 shadow-md rounded-lg">
        <h3 className="text-gray-800 text-lg font-semibold mb-2">{title}</h3>
        <p className="text-gray-600">{description}</p>
      </div>
    );
  };


export default Dashboard;