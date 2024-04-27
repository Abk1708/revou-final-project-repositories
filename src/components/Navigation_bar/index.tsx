import { useState } from 'react';

const Navigation = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const handleToggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    return (
        <nav className="flex flex-col bg-white dark:bg-gray-900 z-0 w-full h-16 top-0 start-0 border-b border-gray-200 dark:border-gray-600">
            <div className="flex justify-between items-center h-full px-4"> {/* Add this container */}
                <div className="flex flex-row-reverse items-center h-16"> {/* Show on mobile */}
                    <div className='flex'>
                    <a href="http://localhost:5173/" className="block md:hidden flex items-center space-x-3 rtl:space-x-reverse">
                        <img src="/logo-no-background.png" className="h-14 rounded-xl" alt="Tech for Village Logo"/> 
                        {/* <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">Tech For Village</span> */}
                    </a>
                    <div>
                        <button 
                            type="button"
                            className=" mx-10 block md:hidden text-gray-900 dark:text-white"
                            onClick={handleToggleMenu}
                        >
                            <svg className="w-6 h-14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M4 6H20M4 12H20M4 18H20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                        </button>
                    </div>
                    </div>
                </div>
                <div className="hidden md:flex items-center space-x-3 rtl:space-x-reverse"> {/* tablet and larger */}
                    <img src="/logo-no-background.png" className="h-14" alt="Tech for Village Logo"/>
                    {/* <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">Tech For Village</span>  siapa tau butuh*/}                 </div>
                <div className="hidden md:flex gap-5 items-center"> {/* laptop or larger */}
                <a href="#" className="text-gray-900 rounded hover:bg-gray-100 hover:text-white md:hover:bg-transparent md:hover:text-blue-700 md:p-0 md:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">Home</a>
            <a href="#" className="text-gray-900 rounded hover:bg-gray-100 hover:text-white md:hover:bg-transparent md:hover:text-blue-700 md:p-0 md:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">About</a>
            <a href="#" className="text-gray-900 rounded hover:bg-gray-100 hover:text-white md:hover:bg-transparent md:hover:text-blue-700 md:p-0 md:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">Service's</a>
            <a href="#" className="text-gray-900 rounded hover:bg-gray-100 hover:text-white md:hover:bg-transparent md:hover:text-blue-700 md:p-0 md:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">Initiation</a>
                    <button type="button" 
                        className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                    >Get started</button>
                    <button type="button"
                        className="text-blue-700 hover:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center dark:text-blue-700 dark:hover:text-white dark:focus:ring-blue-800 border border-blue-700 hover:bg-blue-700 hover:bg-opacity-10 dark:hover:bg-blue-700 dark:hover:bg-opacity-10"
                    >Already Have Account?</button>    
                </div>
            </div>
            {isMenuOpen && (
                <div className="md:hidden justify-center bg-gray-100 hover:bg-white-500 dark:bg-gray-400 py-4 px-2 space-y-2">
                    <a href="#" className="block text-gray-900 hover:text-blue-700">Home</a>
                    <a href="#" className="block text-gray-900 hover:text-blue-700">About</a>
                    <a href="#" className="block text-gray-900 hover:text-blue-700">Service's</a>
                    <a href="#" className="block text-gray-900 hover:text-blue-700">Initiation</a>
                </div>
            )}
        </nav>
    );
};

export default Navigation;