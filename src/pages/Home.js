// src/pages/Home.js

import React, { useState, useEffect, useCallback } from 'react';
import { searchGames } from '../services/api';
import SearchBar from '../components/SearchBar';
import GameCard from '../components/GameCard';
import { Link } from 'react-router-dom'; // Import Link

function Home() {
  const [games, setGames] = useState([]);
  const [loading, setLoading] = useState(false);
  const [sortBy, setSortBy] = useState('rating');
  
  // ... (copy semua fungsi seperti calculateCustomRating dan handleSearch dari App.js lama) ...
  const calculateCustomRating = (game) => {
    const rawgRating = game.rating || 0;
    const metacriticScore = game.metacritic ? game.metacritic / 20 : 0;
    if (metacriticScore === 0) return rawgRating.toFixed(2);
    return ((rawgRating * 0.55) + (metacriticScore * 0.45)).toFixed(2);
  };

  const handleSearch = useCallback(async (searchTerm, platforms) => {
    setLoading(true);
    try {
      const platformIds = Object.keys(platforms)
        .filter((key) => platforms[key])
        .join(',');
      const response = await searchGames(searchTerm, platformIds);
      const gamesWithCustomRating = response.data.results.map(game => ({
        ...game,
        custom_rating: calculateCustomRating(game)
      }));
      gamesWithCustomRating.sort((a, b) => {
        if (sortBy === 'rating') return b.custom_rating - a.custom_rating;
        return new Date(b.released) - new Date(a.released);
      });
      setGames(gamesWithCustomRating);
    } catch (error) {
      console.error("Error fetching games:", error);
    } finally {
      setLoading(false);
    }
  }, [sortBy]);

  useEffect(() => {
    handleSearch('', {});
  }, [handleSearch]);


  return (
    <>
      <SearchBar onSearch={handleSearch} setSortBy={setSortBy} />
      {loading ? (
        <p style={{ textAlign: 'center' }}>Loading games...</p>
      ) : (
        <div className="games-grid">
          {games.map((game) => (
            // Bungkus GameCard dengan Link
            <Link to={`/game/${game.id}`} key={game.id} className="game-card">
              <GameCard game={game} />
            </Link>
          ))}
        </div>
      )}
    </>
  );
}

export default Home;