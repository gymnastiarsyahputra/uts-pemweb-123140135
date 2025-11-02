// src/pages/GameDetail.js

import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getGameDetails } from '../services/api';
import './GameDetail.css'; // Buat file CSS baru untuk styling halaman ini

function GameDetail() {
  const { id } = useParams(); // Mengambil 'id' dari URL
  const [game, setGame] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const response = await getGameDetails(id);
        setGame(response.data);
      } catch (error) {
        console.error("Error fetching game details:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchDetails();
  }, [id]);

  if (loading) return <p>Loading details...</p>;
  if (!game) return <p>Game not found.</p>;

  return (
    <div className="game-detail-container">
       <Link to="/" className="back-button">← Back to Home</Link>
       <h1 className="detail-title">{game.name}</h1>
       <img className="detail-banner" src={game.background_image} alt={game.name} />
       
       <div className="detail-content">
          <h3>Description</h3>
          {/* Membersihkan tag HTML dari deskripsi */}
          <p dangerouslySetInnerHTML={{ __html: game.description }}></p>
          
          <h3>Genres</h3>
          <div className="tags">
            {game.genres.map(genre => <span key={genre.id}>{genre.name}</span>)}
          </div>

          <h3>Platforms</h3>
          <div className="tags">
            {game.platforms.map(p => <span key={p.platform.id}>{p.platform.name}</span>)}
          </div>
       </div>
    </div>
  );
}

export default GameDetail;