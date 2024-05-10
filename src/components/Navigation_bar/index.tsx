import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../Utils/useAuth'; 

const Navigation = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const navigate = useNavigate();
    const { isAuthenticated} = useAuth();

    const handleToggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    const handleMenuItemClick = () => {
        setIsMenuOpen(false); // Close the menu when a menu item is clicked
    };

    const handleLogin = () => {
        navigate('/login')
    }

    const handleRegister = () => {
        navigate('/register')
    }

    const handleLogout = () => {
        navigate('/');
    }

    return (
        <nav className="bg-white dark:bg-gray-900 shadow-md fixed w-full z-10">
            <div className="container mx-auto px-6 py-3 flex justify-between items-center">
                <div className="flex justify-between w-full md:w-auto">
                    <Link to="/" className="text-xl font-semibold text-gray-800 dark:text-white">
                        <img src="/logo-no-background.png" alt="Tech for Village Logo" className="h-10 md:h-14"></img>
                    </Link>
                    <button
                        type="button"
                        className="text-gray-800 dark:text-white block md:hidden focus:outline-none"
                        onClick={handleToggleMenu}
                    >
                        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                        </svg>
                    </button>
                </div>
                <div className="hidden md:flex space-x-8">
                    <Link to="/OurService" className="text-white hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200">Our Service</Link>
                    <Link to="/techNews" className="text-white hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200">Tech News</Link>
                    <Link to="/OurCostumer" className="text-white hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200">Our Customer</Link>
                    <Link to="/Dashboard" className="text-white hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200">Dashboard</Link>
                </div>
                <div className={`${isMenuOpen ? "flex" : "hidden"} absolute bg-white dark:bg-gray-900 top-full left-0 w-full md:hidden`}>
                    <Link to="/" className="block p-2 text-white dark:text-white hover:bg-gray-100 dark:hover:bg-gray-800">Home</Link>
                    <Link to="/about" className="block p-2 text-white dark:text-white hover:bg-gray-100 dark:hover:bg-gray-800">About</Link>
                    <Link to="/services" className="block p-2 text-white dark:text-white hover:bg-gray-100 dark:hover:bg-gray-800">Services</Link>
                </div>
                {isAuthenticated ? (
                    <button
                        onClick={handleLogout}
                        className="hidden md:block text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2"
                    >
                        Logout
                    </button>
                ) : (
                    <div className="hidden md:flex space-x-4">
                        <button
                            onClick={handleLogin}
                            className="text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2"
                        >
                            Get Started
                        </button>
                        <button
                            onClick={handleRegister}
                            className="text-blue-600 hover:bg-gray-200 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 bg-white border border-blue-600"
                        >
                            Sign Up
                        </button>
                    </div>
                )}
            </div>
        </nav>
    );
};

export default Navigation;
