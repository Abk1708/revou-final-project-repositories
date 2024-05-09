import { useState, useEffect } from 'react';
import axios from 'axios';
import Sidebar from '../components/Navigation_bar/Sidebar';
import NewsCard from '../components/NewsCard/NewsCard';

function TechNews() {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [searchInitiated, setSearchInitiated] = useState(false);
  const API_KEY = 'a9673c048d3985c865d4f1d94513c8f0'; // Replace with your actual API key

  useEffect(() => {
    if (searchInitiated) {
      if (selectedCategory) {
        handleSearch(selectedCategory);
      } else {
        handleSearch(searchQuery);
      }
    }
  }, [selectedCategory, searchQuery, searchInitiated]); // Trigger search when selected category or search query changes

  const handleSearch = async (query: string) => {
    try {
      const response = await axios.get(`https://gnews.io/api/v4/search?q=${query}&lang=en&country=us&max=20&apikey=${API_KEY}`);
      setSearchResults(response.data.articles);
    } catch (error) {
      console.error('Error fetching news:', error);
    }
  };

  const handleCategorySelect = (category: string) => {
    setSelectedCategory(category);
    setSearchQuery(''); // Clear search query when category is selected
    setSearchInitiated(true); // Set searchInitiated to true when a category is selected
  };

  const handleSearchButtonClick = () => {
    setSearchInitiated(true); // Set searchInitiated to true when the search button is clicked
  };

  const handleFavoriteClick = () => {
    // Fetch favorite news from local storage and update state accordingly
    const favorites = JSON.parse(localStorage.getItem('favorites') || '[]');
    // Handle the fetched favorites data as needed
    console.log('Favorite News:', favorites);
  };

  return (
    <div className="flex flex-col items-center">
      <header className="w-full py-4 flex justify-center items-center space-x-4 bg-gray-200">
        <h1 className="text-2xl font-semibold">Tech News Dashboard</h1>
        <input
          type="text"
          value={searchQuery}
          onBlur={(e) => setSearchQuery(e.target.value)}
          placeholder="Search..."
          className="px-4 py-2 border border-gray-300 rounded-xl focus:outline-black focus:border-blue-400"
        />
        <button onClick={handleSearchButtonClick} className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:bg-blue-600">
          🔎Search
        </button>
      </header>
      <div className="flex flex-col w-full">
        <Sidebar onCategorySelect={handleCategorySelect} onFavoriteClick={handleFavoriteClick}/>
        <div className="flex flex-wrap justify-center mt-4 space-x-4">
          {searchResults.map((newsItem, index) => (
            <NewsCard key={index} newsItem={newsItem} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default TechNews;
