import axios from 'axios';

const API_KEY = 'd5d1c27ddcba4e57a150738449185716';

const apiClient = axios.create({
  baseURL: 'https://api.rawg.io/api',
  params: {
    key: API_KEY,
  },
});

// Fungsi untuk mencari game
export const searchGames = (searchTerm, platformIds) => {
  return apiClient.get('/games', {
    params: {
      search: searchTerm,
      platforms: platformIds, // e.g., '4,187,186' untuk PC, PS5, Xbox Series S/X
    },
  });
};

// Fungsi untuk mendapatkan detail game
export const getGameDetails = (gameId) => {
  return apiClient.get(`/games/${gameId}`);
};