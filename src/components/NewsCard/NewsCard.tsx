import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart, faBookmark } from '@fortawesome/free-solid-svg-icons';

interface NewsCardProps {
  newsItem: any;
}

const NewsCard: React.FC<NewsCardProps> = ({ newsItem }) => {
  const { title, description, url, image } = newsItem;
  const [liked, setLiked] = useState<boolean>(false);
  const [favorited, setFavorited] = useState<boolean>(false);

  useEffect(() => {
    // Check if the news item is already favorited when component mounts
    const favorites = JSON.parse(localStorage.getItem('favorites') || '[]');
    const isFavorited = favorites.some((fav: any) => fav.title === title);
    setFavorited(isFavorited);
  }, [title]);

  const handleLike = () => {
    setLiked(!liked);
  };

  const handleFavorite = () => {
    const favorites = JSON.parse(localStorage.getItem('favorites') || '[]');
    if (!favorited) {
      // Add to favorites
      favorites.push({ title, description, url, image });
      localStorage.setItem('favorites', JSON.stringify(favorites));
    } else {
      // Remove from favorites
      const updatedFavorites = favorites.filter((fav: any) => fav.title !== title);
      localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
    }
    setFavorited(!favorited);
  };

  return (
    <div className="max-w-xs bg-white shadow-md rounded-lg overflow-hidden my-4">
      {image && (
        <img className="w-full h-54 object-cover object-center" src={image} alt={title} />
      )}
      <div className="p-4">
        <h2 className="text-gray-800 text-lg font-semibold">{title}</h2>
        <p className="mt-2 text-gray-600">{description}</p>
        <div className="flex justify-between items-center mt-4">
          <a href={url} target="_blank" rel="noopener noreferrer" className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none focus:bg-blue-600">
            Read More
          </a>
          <button onClick={handleLike} className={`px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none focus:bg-blue-600 ${liked ? 'bg-gray-500' : ''}`}>
            <FontAwesomeIcon icon={faHeart} className="mr-2" />
            {liked ? 'Liked' : 'Like'}
          </button>
          <button onClick={handleFavorite} className={`px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none focus:bg-blue-600 ${favorited ? 'bg-gray-500' : ''}`}>
            <FontAwesomeIcon icon={faBookmark} className="mr-2" />
            {favorited ? 'Saved' : 'Save'}
          </button>
        </div>
      </div>
    </div>
  );
}

export default NewsCard;
