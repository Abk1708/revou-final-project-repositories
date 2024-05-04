import agriculture from "../assets/agriculture.png";
import tracktorsforservice from "../assets/Traacktors for service.jpg";
import irrigationforservice from "../assets/lumin-osity-6DMht7wYt6g-unsplash.jpg";
import greenhouse from "../assets/devi-puspita-amartha-yahya-DViG1hfL1-w-unsplash.jpg";
import Sustainable from '../assets/energy-control.png'
import SolarCells from '../assets/nuno-marques-0GbrjL3vZF4-unsplash.jpg'
import { Link } from "react-router-dom";

const OurService = () => {
  return (
		<div>
		<section className="bg-slate-800 px-4 py-12 md:px-8 lg:px-16 xl:px-20">
			<div className="text-center mb-8">
				<h1 className="text-3xl font-bold text-white sm:text-4xl">
					Our Service
				</h1>
			</div>
		{/* navigation breadcrumb */}
			<nav className="text-sm font-medium mb-8" aria-label="Breadcrumb">
				<ol className="list-none p-0 inline-flex">
					<li className="flex items-center">
						<Link to="/" className="text-gray-400 hover:text-gray-600">
							Home
						</Link>
						<svg
							className="h-5 w-auto text-gray-400"
							fill="none"
							viewBox="0 0 24 24"
							stroke="currentColor"
						>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth={2}
								d="M9 5l7 7-7 7"
							/>
						</svg>
					</li>
					<li className="flex items-center ml-4">
						<span className="text-white">Our Service</span>
					</li>
				</ol>
			</nav>
				{/* card */}
      <div className="flex overflow-x-auto">
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
				{/* card */}
        <div className="flex-none w-64 mr-4">
          <div className="corousel bg-white shadow-md rounded-md overflow-hidden h-full">
            <img
              className="w-full h-56 object-cover object-center"
              src={tracktorsforservice}
              alt="Card"
            />
            <div className="p-4">
              <h2 className="text-xl font-semibold text-gray-800">e-Tractors</h2>
              <p className="mt-2 text-gray-600">
                Tractors powered with solar cell batteries, eco-friendly, and easy
                maintenance.
              </p>
              <div className="mt-4">
                <a
                  href="#"
                  className="bg-blue-500 rounded-lg px-5 py-2 hover:text-white font-semibold"
                >
                  Order Our service
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="flex-none w-64 mr-4">
          <div className="corousel bg-white shadow-md rounded-md overflow-hidden h-full">
            <img
              className="w-full h-56 object-cover object-center"
              src={irrigationforservice}
              alt="Card"
            />
            <div className="p-4">
              <h2 className="text-xl font-semibold text-gray-800">
                Irrigation Tools System
              </h2>
              <p className="mt-2 text-gray-600">
                From precision sprinklers to smart drip systems, our cutting-edge
                solutions ensure efficient water distribution, leading to
                healthier crops and higher yields
              </p>
              <div className="mt-4">
                <a
                  href="#"
                  className="bg-blue-500 rounded-lg px-5 py-2 hover:text-white font-semibold"
                >
                  Order service
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="flex-none w-64 mr-4">
          <div className="corousel bg-white shadow-md rounded-md overflow-hidden h-full">
            <img
              className="w-full h-56 object-cover object-center"
              src={greenhouse}
              alt="Card"
            />
            <div className="p-4">
              <h2 className="text-xl font-semibold text-gray-800">
                Green House Initiative
              </h2>
              <p className="mt-2 text-gray-600">
                Our Green House Initiative focus on creating more promise and
                sustainable seeds and another hybrid.
              </p>
              <div className="mt-4">
                <a
                  href="#"
                  className="bg-blue-500 rounded-lg px-5 py-2 hover:text-white font-semibold"
                >
                  Order Our Service
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
		{/* new section */}
		<section className="bg-slate-800 px-4 py-12 md:px-8 lg:px-16 xl:px-20">
			<div className="flex overflow-x-auto">
				<div className="flex-none w-64 mr-4">
					<div className="corousel bg-white shadow-md rounded-md overflow-hidden h-full">
						<img
							className="w-full h-56 object-cover object-center"
							src='blank'
							alt="Card"
						/>
						<div className="p-4">
								<h2 className="text-xl font-semibold text-gray-800">
									Green House Initiative
								</h2>
								<p className="mt-2 text-gray-600">
									Our Green House Initiative focus on creating more promise and
									sustainable seeds and another hybrid.
								</p>
							<div className="mt-4">
								<a
									href="#"
									className="bg-blue-500 rounded-lg px-5 py-2 hover:text-white font-semibold"
								>
									Order Our Service
								</a>
							</div>
						</div>
					</div>
				</div>
				{/* card */}
				<div className="flex-none w-64 mr-4">
					<div className="corousel bg-white shadow-md rounded-md overflow-hidden h-full">
						<img
							className="w-full h-56 object-cover object-center"
							src={SolarCells}
							alt="Card"
						/>
						<div className="p-4">
								<h2 className="text-xl font-semibold text-gray-800">SollarCell and Panels</h2>
								<p className="mt-2 text-gray-600">
									Tractors powered with solar cell batteries, eco-friendly, and easy
									maintenance.
								</p>
							<div className="mt-4">
								<a
									href="#"
									className="bg-blue-500 rounded-lg px-5 py-2 hover:text-white font-semibold"
								>
									Order Our service
								</a>
							</div>
						</div>
					</div>
				</div>
				{/* card */}
				<div className="flex-none w-64 mr-4">
					<div className="corousel bg-white shadow-md rounded-md overflow-hidden h-full">
						<img
							className="w-full h-56 object-cover object-center"
							src={irrigationforservice}
							alt="Card"
						/>
						<div className="p-4">
							<h2 className="text-xl font-semibold text-gray-800">
								Irrigation Tools System
							</h2>
							<p className="mt-2 text-gray-600">
								From precision sprinklers to smart drip systems, our cutting-edge
								solutions ensure efficient water distribution, leading to
								healthier crops and higher yields
							</p>
							<div className="mt-4">
								<a
									href="#"
									className="bg-blue-500 rounded-lg px-5 py-2 hover:text-white font-semibold"
								>
									Order service
								</a>
							</div>
						</div>
					</div>
				</div>
				{/* card */}
				<div className="flex-none w-64 mr-4">
					<div className="service-description bg-yellow-500 text-center p-8 rounded-lg h-full">
						<h2 className="text-3xl font-extrabold text-black sm:text-4xl">
							Sustainable Energy
						</h2>
						<img
							src={Sustainable}
							className="mx-auto mt-6 mb-4 w-24 h-24 sm:w-20 sm:h-20"
							alt="Energy-icon"
						/>
						<p className="text-xl text-gray-800">
							We support domestic products that help farmers work with sustainable
							farming cycles.
						</p>
					</div>
				</div>
			</div>
		</section>
		</div>
  );
};

export default OurService;
