import React from 'react';

interface SidebarProps {
  onCategorySelect: (category: string) => void;
  onFavoriteClick: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ onCategorySelect ,onFavoriteClick}) => {
  const handleCategoryClick = (category: string) => {
    onCategorySelect(category);
  };

  
  const handleFavoriteClick = () => {
    onFavoriteClick();
  };

  // handle click function to get favorite news that have been save to the local storage by NewsCard 

  return (
    <div className="flex flex-row w-full bg-gray-200 py-4 justify-center items-center">
      <ul className="flex flex-row gap-x-4 space-y-2 items-center">
        <div className="flex flex-row gap-x-6 items-center">
          <li className="cursor-pointer bg-white py-1 px-2 rounded-full hover:text-white hover:bg-lime-500 hover: border-black" onClick={() => handleCategoryClick('farming technology')}>
            Farm
          </li>
          <li className="cursor-pointer hover:text-blue-500" onClick={() => handleCategoryClick('rural area')}>
            Village
          </li>
          <li className="cursor-pointer hover:text-blue-500" onClick={() => handleCategoryClick('Technology')}>
            Technology
          </li>
          <li className="cursor-pointer hover:text-blue-500" onClick={() => handleFavoriteClick}>
            Favorite
          </li>
        </div>
      </ul>
    </div>
  );
}

export default Sidebar;
