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
        // Implement logout functionality here
        // For example, clear user authentication state and redirect to logout page
        // You might also want to call any logout API endpoint if necessary
        // After logout, you can navigate the user to a specific page, like the homepage
        navigate('/');
    }

    return (
        <nav className="flex flex-row justify-between bg-white dark:bg-black w-full h-20 top-0 start-0 border-b border-gray-200 dark:border-gray-600 relative">
            <div className="hidden md:flex gap-5 items-center pl-4"> {/* laptop or larger */}
                <Link to="/OurService" className="text-gray-900 rounded hover:bg-gray-100 hover:text-white md:hover:bg-transparent md:hover:text-blue-700 md:p-0 md:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">our service</Link>
                <Link to="/techNews" className="text-gray-900 rounded hover:bg-gray-100 hover:text-white md:hover:bg-transparent md:hover:text-blue-700 md:p-0 md:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">Tech News</Link>
                <Link to="/OurCostumer" className="text-gray-900 rounded hover:bg-gray-100 hover:text-white md:hover:bg-transparent md:hover:text-blue-700 md:p-0 md:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">Our costumer</Link>
                <Link to="/Dashboard" className="text-gray-900 rounded hover:bg-gray-100 hover:text-white md:hover:bg-transparent md:hover:text-blue-700 md:p-0 md:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">Dashboard</Link>
            </div>
            <div className="md:hidden absolute top-full bg-white z-10 hover:bg-white py-4 px-2 space-y-2" style={{ display: isMenuOpen ? 'block' : 'none', width: '100%', maxWidth: '100vw', maxHeight: 'calc(100vh - 64px)', overflowY: 'auto' }}>
                <a href="#" className="block text-gray-900 hover:text-blue-500 hover:bg-gray-200" onClick={handleMenuItemClick}>About Us</a>
                <a href="#" className="block text-gray-900 hover:text-blue-500 hover:bg-gray-200" onClick={handleMenuItemClick}>Service</a>
                <a href="#" className="block text-gray-900 hover:text-blue-500 hover:bg-gray-200" onClick={handleMenuItemClick}>Dashboard</a>
            </div>
            <div className=' hidden md:flex pl-10 items-center'>
                <img src="/logo-no-background.png" className="h-14" alt="Tech for Village Logo" />
            </div>
            <div className="flex pl-10 items-center"> {/* Show on mobile */}
                <div>
                    <a href="http://localhost:5173/" className="block md:hidden flex items-center space-x-3 rtl:space-x-reverse">
                        <img src="/logo-no-background.png" className="h-14 rounded-xl" alt="Tech for Village Logo" />
                    </a>
                </div>
            </div>
            <div className='flex px-5 py-5 border-white-4px'>
                <button
                    type="button"
                    className="block md:hidden text-gray-900 dark:text-white"
                    onClick={handleToggleMenu}
                >
                    <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M4 6H20M4 12H20M4 18H20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                </button>
            </div>
            <div className="hidden md:flex items-center pr-4 space-x-3 rtl:space-x-reverse"> {/* tablet and larger */}
                {/* Conditionally render logout button if user is authenticated */}
                {isAuthenticated && (
                    <button
                        onClick={handleLogout}
                        type="button"
                        className="text-blue-700 hover:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center dark:text-blue-700 dark:hover:text-white dark:focus:ring-blue-800 border border-blue-700 hover:bg-blue-700 hover:bg-opacity-10 dark:hover:bg-blue-700 dark:hover:bg-opacity-10"
                    >
                        Logout
                    </button>
                )}

                {/* Conditionally render login and register buttons if user is not authenticated */}
                {!isAuthenticated && (
                    <>
                        <button
                            onClick={handleLogin}
                            type="button"
                            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                        >
                            Get started
                        </button>
                        <button
                            onClick={handleRegister}
                            type="button"
                            className="text-blue-700 hover:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center dark:text-blue-700 dark:hover:text-white dark:focus:ring-blue-800 border border-blue-700 hover:bg-blue-700 hover:bg-opacity-10 dark:hover:bg-blue-700 dark:hover:bg-opacity-10"
                        >
                            Already Have Account?
                        </button>
                    </>
                )}
            </div>
        </nav>
    );
};

export default Navigation;
