import { NavLink, useNavigate } from 'react-router-dom';
import { faUser, faShoppingCart, faRightFromBracket, faHouse } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import '../../assets/style/Dash_nav.css'


function Dash_nav() {

    const navigate = useNavigate();

    const handleLogout = () => {
      // Remove token from local storage
      localStorage.removeItem('token');
  
      // After logout action, redirect user to login page
      // For demo purpose, redirecting to home page "/"
      navigate("/");
    };


  return (
    <div className=" sticky top-0 flex h-full">
        <nav id='navdash' className="flex flex-col bg-black p-4">
            <ul className="flex flex-col gap-y-4 items-center">
            <li className='hover:bg-gray-700 rounded-full py-2 px-2'>
                <NavLink to="/" className="text-gray-300 hover:text-white">
                    <FontAwesomeIcon icon={faHouse} className="w-[25px] h-[25px]"/>
                </NavLink>
                </li>
                <li className='hover:bg-gray-700 rounded-full py-2 px-2'>
                <NavLink to="/dashboard" className="text-gray-300 hover:text-white">
                    <FontAwesomeIcon icon={faUser} className="w-[25px] h-[25px]"/>
                </NavLink>
                </li>
                <li className='hover:bg-gray-700 rounded-full py-2 px-2'>
                <NavLink to="/order" className="text-gray-300 hover:text-white">
                    <FontAwesomeIcon icon={faShoppingCart} className="w-[25px] h-[25px]"/>
                </NavLink>
                </li>
            </ul>
            <div className='relative top-[370px] left-[13px]'>
                    <button onClick={handleLogout} className="text-gray-300 hover:text-white hover:rounded-full hover:bg-grey-700">
                        <FontAwesomeIcon icon={faRightFromBracket} className="w-[25px] h-[25px]"/>
                    </button>
            </div>
        </nav>
    </div>
  )
}

export default Dash_nav

