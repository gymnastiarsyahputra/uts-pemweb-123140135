import React, { useState } from 'react';

const PLATFORM_IDS = {
  PC: 4,
  PlayStation: 187, // PlayStation 5
  Xbox: 186,        // Xbox Series S/X
};

function SearchBar({ onSearch, setSortBy }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [platforms, setPlatforms] = useState({
    PC: false,
    PlayStation: false,
    Xbox: false,
  });

  const handlePlatformChange = (e) => {
    const { name, checked } = e.target;
    setPlatforms(prev => ({ ...prev, [name]: checked }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const platformIds = Object.keys(platforms).reduce((acc, key) => {
        if (platforms[key]) {
            acc[PLATFORM_IDS[key]] = true;
        }
        return acc;
    }, {});
    onSearch(searchTerm, platformIds);
  };

  return (
    <form onSubmit={handleSubmit} className="search-bar">
      <input
        type="text"
        placeholder="Search for a game..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <div className="filters">
        {Object.keys(PLATFORM_IDS).map(platformName => (
            <label key={platformName}>
                <input
                    type="checkbox"
                    name={platformName}
                    checked={platforms[platformName]}
                    onChange={handlePlatformChange}
                /> {platformName}
            </label>
        ))}
      </div>
       <select onChange={(e) => setSortBy(e.target.value)}>
        <option value="rating">Sort by Rating</option>
        <option value="release_date">Sort by Release Date</option>
      </select>
      <button type="submit">Search</button>
    </form>
  );
}

export default SearchBar;